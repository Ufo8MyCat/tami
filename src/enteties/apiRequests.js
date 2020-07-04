import axios from 'axios'

export const getUsers = async () => {
    try {
        const res = await axios.get("http://dummy.restapiexample.com/api/v1/employees")
        return res
    } catch (error) {
        console.log(error)
        return null
    }
   
}