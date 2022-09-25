
import { User } from "../../models/User.js"
import { deleteDocument, getAllDocuments } from "../../utils/crud.js"

export const deleteUser = deleteDocument(User)

export const getAllUsers = getAllDocuments(User)