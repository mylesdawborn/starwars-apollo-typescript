export type Person = {
    name: string
    height: string
    mass: string
    gender: string
    homeworld: string
}

export type PersonDetails = {
    name: string
    height: string
    mass: string
    gender: string
    homeworld: string
    hair_color: string
    eye_color: string
    skin_color: string
    birth_year: string
}

export type PersonReturnData = {
    count: number
    results: Person[]
}