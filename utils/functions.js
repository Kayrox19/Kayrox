const mongoose = require("mongoose");
const { Guild } = require("../models/index");
require("dotenv").config();

module.exports = client => {

  client.getGuild = async guild => {
    const data = await Guild.findOne({ guildID: guild.id }).catch((e) => {
      console.warn("Imoposisble de get l'id")
    });
    return data ? data : undefined;
  };

  client.updateGuild = async (g) => {
    const filter = { guildID: g.id };
    const update = {
      guildName: g.name,
      numberOfUser: g.memberCount
    };

    let doc = await Guild.findOneAndUpdate(filter, update, {
      new: true
    }).then(g => console.log(`${client.timestampParser()} => Update d'un serveur => ${g.guildName}`))
  }

  client.createGuild = async g => {
    const merged = Object.assign({ _id: mongoose.Types.ObjectId() }, {
      guildID: g.id,
      guildName: g.name,
      numberOfUser: g.memberCount,
      prefix: "!",
      ownerId: g.ownerID
    })
    const createGuild = await new Guild(merged);
    createGuild.save().then(g => console.log(`${client.timestampParser()} => Nouveau serveur => ${g.guildName}`));
  }

  client.createTicket = async (g, data) => {
    let data2 = []
    try {
      await Guild.findOneAndUpdate(
        { guildID: g.id },
        {
          $push: {
            tickets: {
              ticketStatus: "Open",
              authorId: data.author,
              openAt: Date.now()
            }
          },
        },
        { new: true, upsert: true, setDefaultsOnInsert: true },
        (err, docs) => {
          if (!err) {
            console.log(`${docs._id} Commandes crée!`)
            const ref = docs.tickets.sort((a, b) => b.openAt - a.openAt)
            return data2.push(ref[0])
          } else {
            console.log(err);
          }
        }
      ).clone()
      return data2[0]
    } catch (err) {
      if (err) console.log("une erreur est survenue");
      return err
    }
  }

  client.updateTicket = async (g, data) => {
    try {
      await Guild.findOne({ guildID: g.id }, async (err, docs) => {
        if (!err) {
          const theRequest = await docs.tickets.find((lead) => {
            // console.log(data.id);
            // console.log(lead._id);
            // if(lead._id === data.id) return lead
            let str = lead._id.toString().split('"')
            if (str[0] === data.id) return lead
          });
          if (theRequest) {
            data.content.map((c) => {
              theRequest.content.push(c);
            })
            theRequest.ticketStatus = "Close"
            theRequest.closeAt = Date.now();
            return docs.save((err) => {
              if (!err) return console.log(`${theRequest.authorId} à bien été mis a jour.`);
              else console.log(err)
            });
          }
        } else {
          console.log(err);
        }
      }).clone();
    } catch (err) {
      if (err) {
        console.log("une erreur");
        console.log(err);
      }
    }
  }

  /* client.getUser = async user => {
     const data = await User.findOne({ userID: user.id });
     return data ? data : undefined;
   }; 
 
   client.updateUser = async (user, auth) => {
     const filter = { userID: user.id };
     const update = { autoPost: !auth.autoPost };
 
     let doc = await User.findOneAndUpdate(filter, update, {
       new: true
     }).then(g => console.log(`${client.timestampParser()} => Update d'un utilisateur => ${user.user.tag}`))
   } */


  client.isEmpty = (value) => {
    return (
      value === undefined ||
      value === null ||
      (typeof value === "object" && Object.keys(value).length === 0) ||
      (typeof value === "string" && value.trim().length === 0)
    );
  };

  client.timestampParser = num => {
    if (num) {
      let options = {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
      };

      let date = new Date(num).toLocaleDateString("fr-FR", options);

      return date.toString();
    } else {
      let options = {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
      };

      let date = new Date(Date.now()).toLocaleDateString("fr-FR", options);

      return date.toString();
    }

  }
};