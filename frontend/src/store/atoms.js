/* eslint-disable no-unused-vars */
import { atom } from "recoil";

export const travelItinerary = atom({
    key: "travelItinerary",
    default: "",
})

export const travelInput = atom({
    key: "travelInput",
    default: {
        place: "",
        days: "",
    }
})