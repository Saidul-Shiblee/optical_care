
export const create = async (documentObject,modelName) => {
    const model = (await import(`../models/${modelName}`)).default;
    const document = model(documentObject);
    const createdDocument = await document.save();
    return createdDocument;
};

export const findAll = async (filter, modelName) => {
    const model = (await import(`../models/${modelName}`)).default;
    const foundDocuments = await model.find(filter).lean();
    return foundDocuments;
}

//Update Document
export const findAndUpdate = async (id, update, modelName) => {
    const model = (await import(`../models/${modelName}`)).default;
    const updatedDocument = await model
        .findOneAndUpdate(id, update, {
            new: true,
        })
    return updatedDocument;
};
export const findAndDelete = async (filter, modelName) => {
    const model = (await import(`../models/${modelName}`)).default;
    const deletedDoc = await model.findOneAndDelete(filter);
    return deletedDoc;
};