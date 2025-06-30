import Axios from "axios";
import { CharacterAPI, HouseAPI } from "./types.ts";
import { GraphQLError } from "graphql";

export const resolvers = {
    Character: {
        house: async (
            parent: CharacterAPI,
            _: unknown,
            __: unknown,
        ): Promise<HouseAPI | null> => {
            if(parent.house === ""){
                return null;
            }
            
            return {
                name: parent.house
            };
        }
    },

    House: {
        characters: async (
            parent: HouseAPI,
            _: unknown,
            __: unknown,
        ): Promise<CharacterAPI[]> => {
            const data_characters = await Axios.get<CharacterAPI[]>(`https://hp-api.onrender.com/api/characters/house/${parent.name}`);

            return data_characters.data;
        }
    },

    Query: {
        getCharacter: async (
            _: unknown,
            args: {
                id: string,
            },
            __: unknown,
        ): Promise<CharacterAPI | null> => {
            const id = args.id;

            if(!id){
                throw new GraphQLError("Inserta el id del personaje");
            }

            const data = await Axios.get<CharacterAPI[]>(`https://hp-api.onrender.com/api/character/${id}`);

            if(data.data.length !== 0){
                return data.data[0];
            }

            return null;
        },

        getCharacters: async (
            _: unknown,
            args: {
                ids?: string[],
            },
            __: unknown,
        ): Promise<CharacterAPI[]> => {
            const arg = args.ids;
            const characters: CharacterAPI[] = [];

            if(arg){
                arg.forEach(async (char) => {
                    const data = await Axios.get<CharacterAPI[]>(`https://hp-api.onrender.com/api/character/${char}`);
                    const data_char = data.data[0];

                    characters.push(data_char);
                });
            }
            else{
                const data = await Axios.get<CharacterAPI[]>(`https://hp-api.onrender.com/api/characters`);
                const data_char = data.data;

                data_char.forEach((char) => {
                    characters.push(char);
                });   
            }

            return characters;
        }
    },
}