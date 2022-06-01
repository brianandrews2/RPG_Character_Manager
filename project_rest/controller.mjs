import * as objects from './model.mjs';
import express from 'express';
import fs from 'fs';

const PORT = 3000;
const app = express();
app.use(express.json());


//################### WORLD CRUD ###################
/**
 * CREATE a new world with no characters
 */
app.post('/create_world', (req, res) => {
    objects.createWorld(req.body.world_name)
        .then( world => {
            res.status(201).json(world);
        })
        .catch(error => {
            console.error(error);
            res.status(400).json({ Error: 'Request failed' });
        })
});

/**
 * GET all worlds
 */
app.get('/worlds', (req, res) => {
    objects.findAllWorlds()
        .then(worlds => {
            console.log(worlds)
            res.send(worlds);
        })
        .catch(error => {
            console.error(error);
            res.send({ error: 'Request failed' });
        });
        
});

/**
 * UPDATE world name
 */
app.put('/worlds/update_world/:_id', (req, res) => {
    objects.updateWorld(req.params._id, req.body.world_name)
        .then(numUpdated => {
            if (numUpdated ===1) {
                res.json({ _id: req.params._id, world_name: req.body.world_name })
            } else {
                res.status(404).json({ Error: "Resource not found" });
            }
        })
        .catch(error => {
            console.error(error);
            res.status(400).json({ Error: 'Request failed' });
        });
});


/**
 * Delete world by param id
 */
app.delete('/worlds/:_id', (req, res) => {
    objects.deleteWorld(req.params._id)
        .then(deletedCount => {
            if (deletedCount ===1) {
                res.status(204).send();
            } else {
                res.status(404).json({ Error: 'Resource not found' });
            }
        })
        .catch(error => {
            console.error(error);
            res.send({ error: 'Request failed' });
        });
});

//################### CHARACTER CRUD ###################

/**
 * CREATE character in specified world
 */
 app.post('/worlds/characters/create_character', (req, res) => {
    objects.createCharacter(req.body.world_name, req.body.character_name)
        .then( character => {
            res.status(201).json(character);
        })
        .catch(error => {
            console.error(error);
            res.status(400).json({ Error: 'Request failed' });
        })
});

/**
 * CREATE default character
 */
 app.post('/worlds/characters/create_default_character', (req, res) => {
    objects.createDefaultCharacter(req.body.world_name, req.body.character_name)
        .then( character => {
            res.status(201).json(character);
        })
        .catch(error => {
            console.error(error);
            res.status(400).json({ Error: 'Request failed' });
        })
});


/**
 * GET all of the world's characters
 */
 app.get('/worlds/characters', (req, res) => {
    const world_id = req.query._id;
    console.log(world_id)
    objects.findWorldCharacters(world_id)
    .then(worlds => {
        console.log(worlds)
        res.send(worlds);
    })
    .catch(error => {
        console.error(error);
        res.send({ error: 'Request failed' });
    });
})

/**
 * GET specific Character using body query parameters
 */
 app.post('/worlds/get_character', (req, res) => {
    console.log(req.query);
    const filter = req.body._id === undefined
        ? {}
        : { _id: req.body._id };
    objects.findCharacter(filter, '', 0)
        .then(character => {
            console.log(character)
            res.send(character);
        })
        .catch(error => {
            console.error(error);
            res.send({ error: 'Request failed' });
        });
        
})

/**
 * UPDATE character
 */
app.put('/worlds/characters/update_character/:_id', (req, res) => {
    objects.updateCharacter(req.params._id, req.body.character_name, req.body.strength, req.body.agility, req.body.intellect, req.body.gold, req.body.level)
    .then(numUpdated => {
        if (numUpdated === 1) {
            res.json({ _id: req.params._id, 
                character_name: req.body.character_name, 
                strength: req.body.strength, 
                agility: req.body.agility, 
                intellect: req.body.intellect, 
                gold: req.body.gold,
                level: req.body.level })
        } else {
            res.status(404).json({ Error: 'Resource not found' });
        }
    })
    .catch(error => {
        console.error(error);
        res.status(400).json({ Error: 'Request failed' });
    });
});


/**
 * DELETE character
 */
 app.delete('/worlds/characters/:_id', (req, res) => {
    objects.deleteCharacter(req.params._id)
        .then(deletedCount => {
            if (deletedCount ===1) {
                res.status(204).send();
            } else {
                res.status(404).json({ Error: 'Resource not found' });
            }
        })
        .catch(error => {
            console.error(error);
            res.send({ error: 'Request failed' });
        });
});


//################### INVENTORY CRUD ###################

/**
 * CREATE item in character's inventory
 */
app.post('/worlds/characters/add_item', (req, res) => {
    objects.addItem(req.body._id, req.body.item_name, req.body.value)
        .then( item => {
            res.status(201).json(item);
        })
        .catch(error => {
            console.error(error);
            res.status(400).json({ Error: 'Request failed'});
        })
});


/**
 * GET items in character's bag
 */
 app.get('/worlds/characters/character_sheet', (req, res) => {
    const character_id = req.query._id;
    console.log(character_id);
    objects.findCharacter(character_id)
        .then(item => {
            console.log(item)
            res.send(item);
        })
        .catch(error => {
            console.error(error);
            res.send({ error: 'Request failed' });
        });
        
})

/**
 * DELETE item
 */
 app.delete('/worlds/characters/character_sheet/:_id', (req, res) => {
    objects.deleteItem(req.params._id)
        .then(deletedCount => {
            if (deletedCount ===1) {
                res.status(204).send();
            } else {
                res.status(404).json({ Error: 'Resource not found' });
            }
        })
        .catch(error => {
            console.error(error);
            res.send({ error: 'Request failed' });
        });
});

/**
 * SELL Item - deletes item and updates character's money
 */
 app.put('/worlds/merchant/:_id', (req, res) => {
    objects.sellItem(req.params._id, req.body.money, req.body._id)
    .then(deletedCount => {
        if (deletedCount ===1) {
            res.status(204).send();
        } else {
            res.status(404).json({ Error: 'Resource not found' });
        }
    })
    .catch(error => {
        console.error(error);
        res.send({ error: 'Request failed' });
    });
});


//################### CURRENCY CONVERTER ###################

/**
 * WRITE Input Currency, Input Amount, and Result Currency to file
 */
app.post('/write_currency', (req, res) => {
    console.log(req.body)
    const input_currency = req.body.input_currency;
    const output_currency = req.body.output_currency;
    const input_amount = req.body.input_amount;
    const string = `${input_currency}  ${output_currency} ${input_amount}`

    fs.writeFile(req.body.url, string, (err) => {
        if (err) {
            console.log(err);
        }

        else {
          console.log("File written successfully\n");
          console.log("The written has the following contents:");
          console.log(string);
          res.status(201).send();
        }
    });
});

/**
 * READ Converted Currency
 */
app.get('/read_currency', (req, res) => {
        const url = "C:\\Users\\Brian\\Documents\\Brian\\College_Files\\OSU\\CS_361_SoftwareEngineering\\Project\\CS361_Project\\currency_converter\\converted_data.txt"
    fs.readFile(url, 'utf-8', (err, data) => {
        if (err) {
            console.log(err);
        } else {
            console.log("The read file contains the following data:")

            let result = ""
            console.log(data.length)
            for (let i = 0; i < data.length-1; i++) {
                console.log(data[i])
                result = result + data[i]
                console.log(result)
            }
 
            data = result
            data = `\"${data}\"`
            console.log(data)


            res.send(data)
        }
    });
});



app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});