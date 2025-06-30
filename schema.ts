export const schemaQL = `#graphql
    type Character {
      id: string!,
      name: string!,
      alternate_names: [string!]!,
      species: string,
      gender: string;
      house: House | null;
    },
    
    type House {
      name: string!,
      characters: [Character!]!,
    },

    type Query {
        getCharacter(id: string!): Character,
        getCharacters(ids: [string]): [Character!]!
    }
`;