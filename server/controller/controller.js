var Productdb = require('../model/model');
var Slidedb = require('../model/modelSlide');
var Userdb = require('../model/modeluser');

//user

exports.createUser = (req,res) => {
    if (!req.body) {
        res.status(400).send({ message: "Content can not be empty" });
        return;
    }

    //new user
    const user = new Userdb({
        firtsName: req.body.firtsName,
        lastName: req.body.lastName,
        email: req.body.email,
        number: req.body.number,
        address: "null",
        status: "Mở",
    })

    //save user
    user
        .save(user)
        .then(data => {
            // res.status(400).send({ message: "thêm thành công" });
            res.redirect('/registerUser')
        })
        .catch(err => {
            res.status(500).send({
                messsage: err.messsage || "Some error occured while creating a create operation",
            })
        })
}

exports.findUser = (req, res) => {

    if (req.query.id) {
        const id = req.query.id;

        Userdb.findById(id)
            .then(data => {
                if (!data) {
                    res.status(404).send({ message: "Not found clother with id=" + id })
                } else {
                    res.send(data)
                }
            })
            .catch(err => {
                res.status(500).send({ message: "error retieving clother with id=" + id })
            })
    } else if (req.query.code) {
        // const code = req.query.code;


        Userdb.find({ code: req.query.code })
            .then(data2 => {
                if (!data2) {
                    res.status(404).send({ message: "Not found clother with code=" + req.query.code })
                } else {
                    res.send(data2)
                }
            })
            .catch(err => {
                res.status(500).send({ message: "error retieving clother with code=" + req.query.code })
            })
    } else {
        let perPage = 10;
        let page = req.query.count;
        Userdb.find().limit(perPage).skip((perPage * page) - perPage)
            .then(user => {
                res.send(user)
            })
            .catch(err => {
                res.status(500).send({ message: err.message || "Error Occurred while retriving clother information" })
            })
    }

}

exports.updateUser = (req, res) => {
    if (!req.body) {
        return res
            .status(400)
            .send({ message: "Data to update can not be empty" })
    }

    const id = req.params.id;
    Userdb.findByIdAndUpdate(id, {
        status: req.body.status
    })
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `Cannot Update slider with ${id}. Maybe user not found!` })
            } else {
                res.redirect(`/admin/updateUser?id=${id}`)
            }
        })
        .catch(err => {
            res.status(500).send({ message: "Error Update slider information" })
        })
}

//Slide
exports.createSlide = (req,res) => {
    if (!req.body) {
        res.status(400).send({ message: "Content can not be empty" });
        return;
    }

    //new slider
    const slide = new Slidedb({
        titleSlider: req.body.titleSlider,
        contentSlider: req.body.contentSlider,
        imageSlider: req.body.imageSlider,
        categorySlider: req.body.categorySlider,
        statusSlider: "active"
    })

    //save slide
    slide
        .save(slide)
        .then(data => {
            // res.send(data),
            res.redirect('/admin/addSlide')
        })
        .catch(err => {
            res.status(500).send({
                messsage: err.messsage || "Some error occured while creating a create operation",
            })
        })
}

exports.findSlide = (req, res) => {

    if (req.query.id) {
        const id = req.query.id;

        Slidedb.findById(id)
            .then(data => {
                if (!data) {
                    res.status(404).send({ message: "Not found clother with id=" + id })
                } else {
                    res.send(data)
                }
            })
            .catch(err => {
                res.status(500).send({ message: "error retieving clother with id=" + id })
            })
    } else if (req.query.code) {
        // const code = req.query.code;


        Slidedb.find({ code: req.query.code })
            .then(data2 => {
                if (!data2) {
                    res.status(404).send({ message: "Not found clother with code=" + req.query.code })
                } else {
                    res.send(data2)
                }
            })
            .catch(err => {
                res.status(500).send({ message: "error retieving clother with code=" + req.query.code })
            })
    } else {
        let perPage = 10;
        let page = req.query.count;
        Slidedb.find({ categorySlider: req.query.category }).limit(perPage).skip((perPage * page) - perPage)
            .then(slide => {
                res.send(slide)
            })
            .catch(err => {
                res.status(500).send({ message: err.message || "Error Occurred while retriving clother information" })
            })
    }

}

exports.updateSlide = (req, res) => {
    if (!req.body) {
        return res
            .status(400)
            .send({ message: "Data to update can not be empty" })
    }

    const id = req.params.id;
    Slidedb.findByIdAndUpdate(id, {
        titleSlider: req.body.titleSlider,
        contentSlider: req.body.contentSlider,
        imageSlider: req.body.imageSlider,
        categorySlider: req.body.categorySlider,
        statusSlider: req.body.statusSlider
    })
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `Cannot Update slider with ${id}. Maybe user not found!` })
            } else {
                res.redirect(`/admin/updateSlide?id=${id}`)
            }
        })
        .catch(err => {
            res.status(500).send({ message: "Error Update slider information" })
        })
}

exports.deleteSlide = async (req, res) => {
    await Slidedb.findByIdAndDelete(req.params.id)
    res.redirect(`/admin/slide?category=slideUp&count=1`)

}
// exports.deleteSlideDown = async (req, res) => {
//     await Productdb.findByIdAndDelete(req.params.id)
//     res.redirect(`/admin/slide?category=slideDown&count=1`)

// }


// create and save new clother
exports.create = (req, res) => {
    //validate request
    if (!req.body) {
        res.status(400).send({ message: "Content can not be empty" });
        return;
    }

    // new clother
    const clother = new Productdb({
        code: req.body.code,
        nameProduct: req.body.nameProduct,
        price: req.body.price,
        quanlity: req.body.quanlity,
        image: req.body.image,
        additional_information: req.body.additional_information = {
            weight: req.body.weight,
            dimensions: req.body.dimensions,
            material: req.body.material,
            color: req.body.color,
            size: req.body.size,
            brand: "null",
            source: "null",
            machine_model: "null",
            shell_material: "null",
            wire_material: "null",
            glass_material: "null",
        },
        description: req.body.description,
        category: req.body.category,
    })

    //save clother
    clother
        .save(clother)
        .then(data => {
            // res.send(data),
            res.redirect('/admin/addClother')
        })
        .catch(err => {
            res.status(500).send({
                messsage: err.messsage || "Some error occured while creating a create operation",
            })
        })
}

//retrieve and return all clother//retrieve and return a single clother
exports.find = (req, res) => {

    if (req.query.id) {
        const id = req.query.id;

        Productdb.findById(id)
            .then(data => {
                if (!data) {
                    res.status(404).send({ message: "Not found clother with id=" + id })
                } else {
                    res.send(data)
                }
            })
            .catch(err => {
                res.status(500).send({ message: "error retieving clother with id=" + id })
            })
    } else if (req.query.code) {
        // const code = req.query.code;


        Productdb.find({ code: req.query.code })
            .then(data2 => {
                if (!data2) {
                    res.status(404).send({ message: "Not found clother with code=" + req.query.code })
                } else {
                    res.send(data2)
                }
            })
            .catch(err => {
                res.status(500).send({ message: "error retieving clother with code=" + req.query.code })
            })
    } else {
        let perPage = 10;
        let page = req.query.count;
        Productdb.find({ category: req.query.category }).limit(perPage).skip((perPage * page) - perPage)
            .then(clother => {
                res.send(clother)
            })
            .catch(err => {
                res.status(500).send({ message: err.message || "Error Occurred while retriving clother information" })
            })
    }

}

// Update a new identified clother by clotherid
exports.update = (req, res) => {
    if (!req.body) {
        return res
            .status(400)
            .send({ message: "Data to update can not be empty" })
    }

    const id = req.params.id;
    Productdb.findByIdAndUpdate(id, {
        code: req.body.code,
        nameProduct: req.body.nameProduct,
        price: req.body.price,
        quanlity: req.body.quanlity,
        image: req.body.image,
        additional_information: req.body.additional_information = {
            weight: req.body.weight,
            dimensions: req.body.dimensions,
            material: req.body.material,
            color: req.body.color,
            size: req.body.size,
            brand: "null",
            source: "null",
            machine_model: "null",
            shell_material: "null",
            wire_material: "null",
            glass_material: "null",
        },
        description: req.body.description,
        category: req.body.category,
    })
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `Cannot Update clother with ${id}. Maybe user not found!` })
            } else {
                res.redirect(`/admin/updateClother?id=${id}`)
            }
        })
        .catch(err => {
            res.status(500).send({ message: "Error Update clother information" })
        })
}


//Delete a clother with specified clotherid in the request
exports.delete = async (req, res) => {
    await Productdb.findByIdAndDelete(req.params.id)
    res.redirect(`/admin/clother?category=men&count=1`)
}

// Balo
exports.createBalo = (req, res) => {
    //validate request
    if (!req.body) {
        res.status(400).send({ message: "Content can not be empty" });
        return;
    }

    // new balo
    const balo = new Productdb({
        code: req.body.code,
        nameProduct: req.body.nameProduct,
        price: req.body.price,
        quanlity: req.body.quanlity,
        image: req.body.image,
        additional_information: req.body.additional_information = {
            weight: req.body.weight,
            dimensions: req.body.dimensions,
            material: req.body.material,
            color: req.body.color,
            size: "null",
            brand: "null",
            source: "null",
            machine_model: "null",
            shell_material: "null",
            wire_material: "null",
            glass_material: "null",
        },
        description: req.body.description,
        category: req.body.category,
    })

    //save clother
    balo
        .save(balo)
        .then(data => {
            // res.send(data),
            res.redirect('/admin/addBalo')
        })
        .catch(err => {
            res.status(500).send({
                messsage: err.messsage || "Some error occured while creating a create operation",
            })
        })
}
exports.findBalo = (req, res) => {

    if (req.query.id) {
        const id = req.query.id;

        Productdb.findById(id)
            .then(data => {
                if (!data) {
                    res.status(404).send({ message: "Not found balo with id=" + id })
                } else {
                    res.send(data)
                }
            })
            .catch(err => {
                res.status(500).send({ message: "error retieving balo with id=" + id })
            })
    } else if (req.query.code) {
        const code = req.query.code;


        Productdb.find({ code })
            .then(data2 => {
                if (!data2) {
                    res.status(404).send({ message: "Not found balo with code=" + req.query.code })
                } else {
                    res.send(data2)
                }
            })
            .catch(err => {
                res.status(500).send({ message: "error retieving balo with code=" + req.query.code })
            })
    } else {
        let perPage = 10;
        let page = req.query.count;
        Productdb.find({ category: req.query.category }).limit(perPage).skip((perPage * page) - perPage)
            .then(balo => {
                res.send(balo)
            })
            .catch(err => {
                res.status(500).send({ message: err.message || "Error Occurred while retriving balo information" })
            })
    }

}
exports.updateBalo = (req, res) => {
    if (!req.body) {
        return res
            .status(400)
            .send({ message: "Data to update can not be empty" })
    }

    const id = req.params.id;
    Productdb.findByIdAndUpdate(id, {
        code: req.body.code,
        nameProduct: req.body.nameProduct,
        price: req.body.price,
        quanlity: req.body.quanlity,
        image: req.body.image,
        additional_information: req.body.additional_information = {
            weight: req.body.weight,
            dimensions: req.body.dimensions,
            material: req.body.material,
            color: req.body.color,
            size: "null",
            brand: "null",
            source: "null",
            machine_model: "null",
            shell_material: "null",
            wire_material: "null",
            glass_material: "null",
        },
        description: req.body.description,
        category: req.body.category,
    })
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `Cannot Update balo with ${id}. Maybe user not found!` })
            } else {
                res.redirect(`/admin/updateBalo?id=${id}`)
            }
        })
        .catch(err => {
            res.status(500).send({ message: "Error Update balo information" })
        })
}
exports.deleteBalo = async (req, res) => {
    await Productdb.findByIdAndDelete(req.params.id)
    res.redirect(`/admin/balo?category=balo&count=1`)

}
// //Watches
exports.createWatches = (req, res) => {
    //validate request
    if (!req.body) {
        res.status(400).send({ message: "Content can not be empty" });
        return;
    }

    // new watches
    const watches = new Productdb({
        code: req.body.code,
        nameProduct: req.body.nameProduct,
        price: req.body.price,
        quanlity: req.body.quanlity,
        image: req.body.image,
        additional_information: req.body.additional_information = {
            weight: 0,
            dimensions: 0,
            material: "null",
            color: "null",
            size: "null",
            brand: req.body.brand,
            source: req.body.source,
            machine_model: req.body.machine_model,
            shell_material: req.body.shell_material,
            wire_material: req.body.wire_material,
            glass_material: req.body.glass_material,
        },
        description: req.body.description,
        category: req.body.category,
    })

    //save watches
    watches
        .save(watches)
        .then(data => {
            // res.send(data),
            res.redirect('/admin/addWatches')
        })
        .catch(err => {
            res.status(500).send({
                messsage: err.messsage || "Some error occured while creating a create operation",
            })
        })
}

// //retrieve and return all clother//retrieve and return a single clother
exports.findWatches = (req, res) => {

    if (req.query.id) {
        const id = req.query.id;

        Productdb.findById(id)
            .then(data => {
                if (!data) {
                    res.status(404).send({ message: "Not found watches with id=" + id })
                } else {
                    res.send(data)
                }
            })
            .catch(err => {
                res.status(500).send({ message: "error retieving watches with id=" + id })
            })
    } else if (req.query.code) {
        const code = req.query.code;


        Productdb.find({ code })
            .then(data2 => {
                if (!data2) {
                    res.status(404).send({ message: "Not found watches with code=" + req.query.code })
                } else {
                    res.send(data2)
                }
            })
            .catch(err => {
                res.status(500).send({ message: "error retieving watches with code=" + req.query.code })
            })
    } else {
        let perPage = 10;
        let page = req.query.count;
        Productdb.find({ category: req.query.category }).limit(perPage).skip((perPage * page) - perPage)
            .then(watches => {
                res.send(watches)
            })
            .catch(err => {
                res.status(500).send({ message: err.message || "Error Occurred while retriving watches information" })
            })
    }

}

//Update a new identified clother by clotherid
exports.updateWatches = (req, res) => {
    if (!req.body) {
        return res
            .status(400)
            .send({ message: "Data to update can not be empty" })
    }

    const id = req.params.id;
    Productdb.findByIdAndUpdate(id, {
        code: req.body.code,
        nameProduct: req.body.nameProduct,
        price: req.body.price,
        quanlity: req.body.quanlity,
        image: req.body.image,
        additional_information: req.body.additional_information = {
            weight: 0,
            dimensions: 0,
            material: "null",
            color: "null",
            size: "null",
            brand: req.body.brand,
            source: req.body.source,
            machine_model: req.body.machine_model,
            shell_material: req.body.shell_material,
            wire_material: req.body.wire_material,
            glass_material: req.body.glass_material,
        },
        description: req.body.description,
        category: req.body.category,
    })
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `Cannot Update Watches with ${id}. Maybe user not found!` })
            } else {
                res.redirect(`/admin/updateWatches?id=${id}`)
            }
        })
        .catch(err => {
            res.status(500).send({ message: "Error Update Watches information" })
        })
}


//Delete a clother with specified clotherid in the request
exports.deleteWatches = async (req, res) => {
    await Productdb.findByIdAndDelete(req.params.id)
    res.redirect(`/admin/watches?category=watches&count=1`)

}


//Shoes
exports.createShoes = (req, res) => {
    //validate request
    if (!req.body) {
        res.status(400).send({ message: "Content can not be empty" });
        return;
    }

    // new shoes
    const shoes = new Productdb({
        code: req.body.code,
        nameProduct: req.body.nameProduct,
        price: req.body.price,
        quanlity: req.body.quanlity,
        image: req.body.image,
        additional_information: req.body.additional_information = {
            weight: 0,
            dimensions: 0,
            material: "null",
            color: req.body.color,
            size: req.body.size,
            brand: req.body.brand,
            source: req.body.source,
            machine_model: "null",
            shell_material: "null",
            wire_material: "null",
            glass_material: "null",
        },
        description: req.body.description,
        category: req.body.category,
    })

    //save shoes
    shoes
        .save(shoes)
        .then(data => {
            // res.send(data),
            res.redirect('/admin/addShoes')
        })
        .catch(err => {
            res.status(500).send({
                messsage: err.messsage || "Some error occured while creating a create operation",
            })
        })
}

// //retrieve and return all clother//retrieve and return a single clother
exports.findShoes = (req, res) => {

    if (req.query.id) {
        const id = req.query.id;

        Productdb.findById(id)
            .then(data => {
                if (!data) {
                    res.status(404).send({ message: "Not found shoes with id=" + id })
                } else {
                    res.send(data)
                }
            })
            .catch(err => {
                res.status(500).send({ message: "error retieving shoes with id=" + id })
            })
    } else if (req.query.code) {
        const code = req.query.code;


        Productdb.find({ code })
            .then(data2 => {
                if (!data2) {
                    res.status(404).send({ message: "Not found shoes with code=" + req.query.code })
                } else {
                    res.send(data2)
                }
            })
            .catch(err => {
                res.status(500).send({ message: "error retieving shoes with code=" + req.query.code })
            })
    } else {
        let perPage = 10;
        let page = req.query.count;
        Productdb.find({ category: req.query.category }).limit(perPage).skip((perPage * page) - perPage)
            .then(shoes => {
                res.send(shoes)
            })
            .catch(err => {
                res.status(500).send({ message: err.message || "Error Occurred while retriving shoes information" })
            })
    }

}

//Update a new identified clother by clotherid
exports.updateShoes = (req, res) => {
    if (!req.body) {
        return res
            .status(400)
            .send({ message: "Data to update can not be empty" })
    }

    const id = req.params.id;
    Productdb.findByIdAndUpdate(id, {
        code: req.body.code,
        nameProduct: req.body.nameProduct,
        price: req.body.price,
        quanlity: req.body.quanlity,
        image: req.body.image,
        additional_information: req.body.additional_information = {
            weight: 0,
            dimensions: 0,
            material: "null",
            color: req.body.color,
            size: req.body.size,
            brand: req.body.brand,
            source: req.body.source,
            machine_model: "null",
            shell_material: "null",
            wire_material: "null",
            glass_material: "null",
        },
        description: req.body.description,
        category: req.body.category,
    })
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `Cannot Update Shoes with ${id}. Maybe user not found!` })
            } else {
                res.redirect(`/admin/updateShoes?id=${id}`)
                // res.send(data)
                // res.status(500).send( "Update Successfully" )
            }
        })
        .catch(err => {
            res.status(500).send({ message: "Error Update Shoes information" })
        })
}


//Delete a clother with specified clotherid in the request
exports.deleteShoes = async (req, res) => {
    await Productdb.findByIdAndDelete(req.params.id)
    res.redirect(`/admin/shoes?category=shoes&count=1`)
    // res.status(500).send({ message: "Delete successfully" })

}

//ClotherWoman
exports.createClotherWoman = (req, res) => {
    //validate request
    if (!req.body) {
        res.status(400).send({ message: "Content can not be empty" });
        return;
    }

    // new clother
    const clotherWoman = new Productdb({
        code: req.body.code,
        nameProduct: req.body.nameProduct,
        price: req.body.price,
        quanlity: req.body.quanlity,
        image: req.body.image,
        additional_information: req.body.additional_information = {
            weight: req.body.weight,
            dimensions: req.body.dimensions,
            material: req.body.material,
            color: req.body.color,
            size: req.body.size,
            brand: "null",
            source: "null",
            machine_model: "null",
            shell_material: "null",
            wire_material: "null",
            glass_material: "null",
        },
        description: req.body.description,
        category: req.body.category,
    })

    //save ClotherWoman
    clotherWoman
        .save(clotherWoman)
        .then(
            res.redirect('/admin/addClotherWoman')
        )
        .catch(err => {
            res.status(500).send({
                messsage: err.messsage || "Some error occured while creating a create operation",
            })
        })
}

//retrieve and return all clother//retrieve and return a single clother
exports.findClotherWoman = (req, res) => {

    if (req.query.id) {
        const id = req.query.id;

        Productdb.findById(id)
            .then(data => {
                if (!data) {
                    res.status(404).send({ message: "Not found ClotherWoman with id=" + id })
                } else {
                    res.send(data)
                }
            })
            .catch(err => {
                res.status(500).send({ message: "error retieving ClotherWoman with id=" + id })
            })
    } else if (req.query.code) {
        // const code = req.query.code;


        Productdb.find({ code: req.query.code })
            .then(data2 => {
                if (!data2) {
                    res.status(404).send({ message: "Not found ClotherWoman with code=" + req.query.code })
                } else {
                    res.send(data2)
                }
            })
            .catch(err => {
                res.status(500).send({ message: "error retieving ClotherWoman with code=" + req.query.code })
            })
    } else {
        let perPage = 10;
        let page = req.query.count;
        Productdb.find({ category: req.query.category }).limit(perPage).skip((perPage * page) - perPage)
            .then(clotherClotherWoman => {
                res.send(clotherClotherWoman)
            })
            .catch(err => {
                res.status(500).send({ message: err.message || "Error Occurred while retriving ClotherWoman information" })
            })
    }

}

// Update a new identified ClotherWoman by clotherid
exports.updateClotherWoman = (req, res) => {
    if (!req.body) {
        return res
            .status(400)
            .send({ message: "Data to update can not be empty" })
    }

    const id = req.params.id;
    Productdb.findByIdAndUpdate(id, {
        code: req.body.code,
        nameProduct: req.body.nameProduct,
        price: req.body.price,
        quanlity: req.body.quanlity,
        image: req.body.image,
        additional_information: req.body.additional_information = {
            weight: req.body.weight,
            dimensions: req.body.dimensions,
            material: req.body.material,
            color: req.body.color,
            size: req.body.size,
            brand: "null",
            source: "null",
            machine_model: "null",
            shell_material: "null",
            wire_material: "null",
            glass_material: "null",
        },
        description: req.body.description,
        category: req.body.category,
    })
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `Cannot Update ClotherWoman with ${id}. Maybe user not found!` })
            } else {
                res.redirect(`/admin/updateClotherWoman?id=${id}`)
            }
        })
        .catch(err => {
            res.status(500).send({ message: "Error Update ClotherWoman information" })
        })
}


//Delete a clother with specified clotherid in the request
exports.deleteClotherWoman = async (req, res) => {
    await Productdb.findByIdAndDelete(req.params.id)
    res.redirect(`/admin/clotherWoman?category=woman&count=1`)
}


exports.findAll = (req, res) => {
    Productdb.find()
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({ message: err.message || "Error Occurred while retriving prodcut information" })
        })
}