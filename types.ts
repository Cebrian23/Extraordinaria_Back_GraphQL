//https://hp-api.onrender.com/
export type CharacterAPI = {
    id: string;
    name: string;
    alternate_names: string[];
    species: string;
    gender: string;
    house: string;
}

export type Character = {
    id: string;
    name: string;
    alternate_names: string[];
    species: string;
    gender: string;
    house: House | null;
};

export type HouseAPI = {
    name: string,
}

export type House = {
    name: string;
    characters: Character[];
};