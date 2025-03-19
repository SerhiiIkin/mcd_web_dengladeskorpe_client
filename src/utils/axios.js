import axios from "axios";
import { toast } from "react-toastify";

export const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_PUBLIC_SERVER,
});

export const axiosGetData = async ({ title, role }) => {
    try {
        const { data } = await axiosInstance.get(title);
        return data.data;
    } catch (error) {
        console.log("Error fetching data:", error);
        role === "admin" && toast.error("Error fetching data");
    }
};

export const axiosGetSingleData = async ({ title, id, role }) => {
    try {
        const { data } = await axiosInstance.get(`${title}/${id}`);
        return data.data;
    } catch (error) {
        console.log("Error fetching data:", error);
        role === "admin" && toast.error("Error fetching data");
    }
};

export const axiosPostData = async ({ title, formData, role }) => {
    try {
        const { data } = await axiosInstance.post(title, formData);
        return data;
    } catch (error) {
        console.log("Error sending data:", error);
        role === "admin" && toast.error("Error saving data");
    }
};

export const axiosRemoveData = async ({ title, id, role = "user" }) => {
    try {
        const { data } = await axiosInstance.delete(`${title}/${id}`);
        return data;
    } catch (error) {
        console.log("Error removing data:", error);
        role === "admin" && toast.error("Error removing data");
    }
};

export const axiosUpdateData = async ({ title, formData, role }) => {
    try {
        const { data } = await axiosInstance.put(title, formData);
        return data;
    } catch (error) {
        console.log("Error updating data:", error);
        role === "admin" && toast.error("Error updating data");
    }
};
