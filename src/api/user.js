import axiosClient from "./axiosClient";
import {useState} from "react"


export async function fetchUserProfile() {
    const resp = await axiosClient.get('/api/user/');
    return resp.data;
}

export async function updateUserProfile(payload) {
    const resp = await axiosClient.put('/api/user/', payload);
    return resp.data;
}

export async function deleteUserAccount(){
    const resp = await axiosClient.delete('/api/user/');
    return resp.data;
}

export async function createUserAccount(payload){
    const resp = await axiosClient.post('/api/user/', payload);
    return resp.data;
}