import React from "react"

export type Person = {
    name: string
    height: string
    mass: string
    gender: string
    homeworld: string
}

export type PersonDetails = {
    name: String
    height: String
    mass: String
    gender: String
    homeworld: String
    hair_color: String
    eye_color: String
    skin_color: String
    birth_year: String
}

export type PersonReturnData = {
    count: number
    results: Person[]
}

export interface FCProps {
    children: React.ReactChild | React.ReactFragment | React.ReactElement[]
}