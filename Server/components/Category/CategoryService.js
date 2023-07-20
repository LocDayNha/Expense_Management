const CategoryModel = require('./CategoryModel');

const getCategories = async () => {
  return await CategoryModel.find({});
}
const getCategoryById = async (id) => {
  try {
    const category = await CategoryModel.findById(id)
    console.log(category)
    return category;

  } catch (error) {
    return false;
  }
}

const getCategoryByName = async (name) => {
  try {
    const category = await CategoryModel.find({name})
    console.log(category)
    return category;

  } catch (error) {
    return false;
  }
}

const newCategory = async (name, type, image) => {
  try {
    const category = await CategoryModel.findOne({ name: name })
    console.log("category:" + category);
    if (category) {
      return false;
    } else {
      const newCategory = { name, type, image }
      const category = new CategoryModel(newCategory);
      await category.save();
      return true;
    }
  } catch (e) {
    console.log("EROOR add new" + e);
    return false
  }
}

const deleteById = async (id) => {
  try {
    await CategoryModel.findByIdAndDelete(id);
    return true;
  } catch (error) {
    return false;
  }
}

const updateById = async (id, name, type, image) => {
  try {
    const category = await CategoryModel.findById(id)
    console.log(category)
    if (category) {
      category.name = name ? name : category.name;
      category.type = type ? type : category.type;
      category.image = image ? image : category.image;


      await category.save();
      return true;
    }
    return false
  } catch (error) {
    console.log("Update category by id error: ", error);
    return false;
  }
}

const searchByType = async (type) => {
  try {
    const category = await CategoryModel.find({ type: type })
    console.log(category)
    return category;

  } catch (error) {
    return false;
  }
}

module.exports = {
  getCategories, newCategory, deleteById,
  updateById, getCategoryById, searchByType,
  getCategoryByName,
};

