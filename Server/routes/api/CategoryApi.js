const express = require('express');
const router = express.Router();
const categoryController = require('../../components/Category/CategoryController')
const upLoadImage = require("../../MiddleWare/UpLoadImage")


//http://localhost:3000/category/api/new
router.post('/new', [upLoadImage.single('image')], async (req, res, next) => {
    try {
        let { body, file } = req;
        if (file) {
            file = `http://10.0.2.2:3000/images/${file.filename}`;
            body = { ...body, image: file };
        }
        const { name, type, image } = body;
        const category = await categoryController.newCategory(name, type, image);
        if (category) {
            return res.status(200).json({ massage: "Add new success", result: true, category: category, });
        } else {
            return res.status(400).json({ massage: "Failed to add new", result: false, category: null, });
        }
    } catch (error) {
        return res.status(500).json({ error: error })
    }
})

//http://localhost:3000/category/api/get-all-categories
router.get('/get-all-categories', [], async (req, res, next) => {
    try {
        return await res.status(200).json(await categoryController.getCategories());
    } catch (error) {
        return res.status(500).json({ error: error })
    }
})

//http://localhost:3000/category/api/get-by-id?id
router.get('/get-by-id', [], async (req, res, next) => {
    try {
        const { id } = req.query;
        const category = await categoryController.getCategoryById(id)
        if (category) {
            return res.status(200).json({ result: true, category: category });
        }
        return res.status(400).json({ result: false, category: null });
    } catch (error) {
        return res.status(500).json({ error: error })
    }
})
//http://localhost:3000/category/api/get-by-name?
router.get('/get-by-name', [], async (req, res, next) => {
    try {
        const { name } = req.query;
        const category = await categoryController.getCategoryByName(name)
        if (category) {
            return res.status(200).json({ result: true, category: category });
        }
        return res.status(400).json({ result: false, category: null });
    } catch (error) {
        return res.status(500).json({ error: error })
    }
})
//http://localhost:3000/category/api/delete-by-id
router.delete('/delete-by-id', [], async (req, res, next) => {
    try {
        const { id } = req.query;
        const category = await categoryController.deleteById(id)
        if (category) {
            return res.status(200).json({ message: "Delete Success", result: true, category: category });
        }
        return res.status(400).json({ result: false, category: null });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: error.message })
    }
})

//http://localhost:3000/category/api/update-by-id?id
router.put('/update-by-id', [], async (req, res, next) => {
    try {
        const { id } = req.query;
        const { name, type, image } = req.body;
        const category = await categoryController.updateById(id, name, type, image)
        if (category) {
            return res.status(200).json({ message: "Update Success", result: true, category: category });
        }
        return res.status(400).json({ result: false, category: null });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: error.message })
    }
})

//http://localhost:3000/category/api/search-by-type
router.get('/search-by-type', [], async (req, res, next) => {
    try {
        const { type } = req.query;
        const category = await categoryController.searchByType(type)
        if (category) {
            return res.status(200).json({ message: "Update Success", result: true, category: category });
        }
        return res.status(400).json({ result: false, category: null });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: error.message })
    }
})

module.exports = router;