import priceModel from "../models/price";
import Group from "../models/groups";
import LensType from "../models/lens";
import Package from "../models/packages";

export const findAll = async (filter) => {
    const foundDocuments = await priceModel.find(filter).populate({
        path: "group",
        select: "groupName",
        model: Group,
    }).populate({
        path: "lenseType",
        select: "lensName",
        model: LensType,
    }).populate({
        path: "package",
        select: "packageName",
        model: Package,
    }).lean();
    return foundDocuments;
}
//Update Document
export const findAndUpdate = async (id, update) => {
    const updatedDocument = await priceModel
        .findOneAndUpdate(id, update, {
            new: true,
        }).populate({
            path: "lenseType",
            select: "lensName",
            model: "LensType",
        }).populate({
            path: "group",
            select: "groupName",
            model: "Group",
        }).populate({
            path: "package",
            select: "packageName",
            model: "Package",
        }).lean()
    return updatedDocument;
};
