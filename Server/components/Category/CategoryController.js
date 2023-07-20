

const categoryService = require('./CategoryService');

const getCategories = async () => {
    try {
        return await categoryService.getCategories();
    } catch (error) {
        return null;

    }
}

const getCategoryById = async (id) => {
    try {
        return await categoryService.getCategoryById(id);
    } catch (error) {
        return null;
    }
}
const getCategoryByName = async (name) => {
    try {
        return await categoryService.getCategoryByName(name);
    } catch (error) {
        return null;
    }
}

const newCategory = async (name, type, image) => {
    try {
        return await categoryService.newCategory(name, type, image);
    }
    catch (error) {
        console.log(error);
        return null;
    }
}

const deleteById = async (id) => {
    try {
        return await categoryService.deleteById(id);

    }
    catch (error) {
        console.log(error);
        throw error;
    }
}

const updateById = async (id, name, type, image) => {
    try {
        return await categoryService.updateById(id, name, type, image);

    } catch (error) {
        return false;
    }
}
const searchByType = async (type) => {
    try {
        return await categoryService.searchByType(type);

    } catch (error) {
        return false;
    }
}

module.exports = {
    getCategories, newCategory, deleteById,
    updateById, getCategoryById, searchByType,
    getCategoryByName,
   
};