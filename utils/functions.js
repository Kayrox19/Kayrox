const mongoose = require("mongoose");
const { Guild, Giveaway } = require("../models/index");
require("dotenv").config();

module.exports = client => {

  //Guild
  client.getGuild = async guild => {
    const data = await Guild.findOne({ guildID: guild.id }).catch((e) => {
      console.warn("Imoposisble de get l'id")
    });
    return data ? data : undefined;
  };

  client.updateGuild = async g => {
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

  //Tickets
  client.createTicket = async (g, data) => {
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
        async (err, docs) => {
          if (!err) {
            console.log(`${docs._id} Commandes crée!`)
          } else {
            console.log(err);
          }
        }
      ).clone()

      const query = Guild.find({
        guildID: g.id,
      });
      query.getFilter();

      const doc = await query.exec();
      const ref = doc[0].tickets.sort((a, b) => b.openAt - a.openAt)
      return ref[0];
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

  //InvitesManager
  client.userRef = async (g, data) => {
    try {
      await Guild.findOne({ guildID: g.id }, async (err, docs) => {
        if (!err) {
          const theRequest = await docs.users.find((lead) => {
            if (lead.userId === data.id) return lead
          });
          if (theRequest) {
            if (!theRequest.invited.includes(data.invited)) {
              if (data.type === "Add") {
                theRequest.invitedNumber++;
                theRequest.invited.push(data.invited);

                return docs.save((err) => {
                  if (!err) return console.log(`${theRequest.userId} est passer à ${theRequest.invitedNumber} d'inviter.`);
                  else console.log(err)
                });
              }
            } else {
              if (data.type === "Remove") {
                theRequest.invitedNumber--;
                for (let i = 0; i < theRequest.invited.length; i++) {
                  if (theRequest.invited[i] === data.invited) {
                    theRequest.invited.splice(i, 1);
                  }
                }
                return docs.save((err) => {
                  if (!err) return console.log(`${theRequest.userId} est passer à ${theRequest.invitedNumber} d'inviter.`);
                  else console.log(err)
                });
              }
            }
          } else {
            if (data.type === "Add") {
              docs.users.push({
                userId: data.id,
                invitedNumber: 1,
                invited: [data.invited]
              });

              return docs.save((err) => {
                if (!err) return console.log(`${data.id} à été correctement sauvegarder dans la BDD.`);
                else console.log(err)
              });
            } else if (data.type === "Remove") {
              docs.users.push({
                userId: data.id,
                invitedNumber: 0,
                invited: []
              });

              return docs.save((err) => {
                if (!err) return console.log(`${data.id} à été correctement sauvegarder dans la BDD.`);
                else console.log(err)
              });
            }



          }
        } else {
          console.log(err);
        }
      }).clone();
    } catch (err) {
      if (err) console.log("une erreur est survenue");
      return err
    }
  }

  client.setCodeForUser = async (g, data) => {
    try {
      await Guild.findOne({ guildID: g.id }, async (err, docs) => {
        if (!err) {
          const theRequest = await docs.users.find((lead) => {
            if (lead.userId === data.id) return lead
          });

          if (theRequest) {
            theRequest.affiliateCode = data.code;

            return docs.save((err) => {
              if (!err) return console.log(`${theRequest.userId} à recus son code ${theRequest.affiliateCode}.`);
              else console.log(err)
            });
          }
        } else {
          console.log(err);
        }
      }).clone();
    } catch (err) {
      if (err) console.log("une erreur est survenue");
      return err
    }
  }

  client.payUser = async (g, data) => {
    try {
      const up = await Guild.findOne({ guildID: g.id }, async (err, docs) => {
        if (!err) {
          const theRequest = await docs.users.find((lead) => {
            if (lead.userId === data.id) return lead
          });

          if (theRequest) {
            if (data.type === "pay") {
              const percent = await client.calculatePercentForCode(theRequest.invitedNumber);
              theRequest.wallet = theRequest.wallet + (data.price * (percent / 100));

              return docs.save((err) => {
                if (!err) return console.log(`${theRequest.userId} à recus argent ${theRequest.wallet}€.`);
                else console.log(err)
              });
            } else if (data.type === "reset") {
              theRequest.wallet = 0;

              return docs.save((err) => {
                if (!err) return console.log(`${theRequest.userId} à bien été reset ${theRequest.wallet}€.`);
                else console.log(err)
              });
            }

          }
        } else {
          console.log(err);
        }
      }).clone();
      return up;
    } catch (err) {
      if (err) console.log("une erreur est survenue");
      return err
    }
  }

  client.calculatePercentForCode = async number => {
    if (number < 5) return 0;
    else if (number >= 20) return 20;
    else if (number >= 10) return 15;
    else if (number >= 5) return 10;
  }

  //Giveaway
  client.createGiveaway = async (winners, prize, time, messageId) => {
    const merged = Object.assign({ _id: mongoose.Types.ObjectId() }, {
      messageId: messageId,
      prize: prize,
      numberOfWinner: winners,
      time: time
    })
    const createGive = await new Giveaway(merged);
    createGive.save().then(g => console.log(`${client.timestampParser()} => Nouveau giveaway => ${g._id}`));
  }

  client.findGiveAway = async messageId => {
    const data = await Giveaway.findOne({ messageId: messageId }).catch((e) => {
      console.warn("Imoposisble de get l'id")
    });
    return data ? data : undefined;
  };

  client.addUserToGiveAway = async (messageId, user) => {
    try {
      await Giveaway.findOneAndUpdate(
        { messageId: messageId },
        {
          $push: {
            users: user
          },
        },
        { new: true, upsert: true, setDefaultsOnInsert: true },
        async (err, docs) => {
          if (!err) {
            console.log(`${user} user ajouter`)
          } else {
            console.log(err);
          }
        }
      )
    } catch (err) {
      if (err) console.log("une erreur est survenue");
      return err
    }
  }

  client.getAllGive = async () => {
    const data = await Giveaway.find().catch((e) => {
      console.warn("Imoposisble de get l'id")
    });
    return data ? data : undefined;
  };

  client.deleteGive = async id => {
    await Giveaway.deleteOne({ _id: id }).exec().then(() => {
      console.log(`${client.timestampParser()} giveaway --> ${id} vient d'etres suprimer`);
    })
  }

  //Misc
  client.isEmpty = value => {
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