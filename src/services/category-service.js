import {myAxios} from "./Helper";

export const loadAllCategories = () => {
    return myAxios.get("/category/").then( response=>{ return response.data})
}