



import IPeople from '@interfaces/IPeople'
import { IPeopleData,IHobby } from '@interfaces/IPeopleData'
import prisma from '@utils/prisma'

class PeopleService implements IPeople {
    getPeople() {
        return prisma.person.findMany();
    }
    setPeople(data: IPeopleData) {
        return prisma.person.create({
            data: {
                name: data.name,
                age: data.age,
                hobbies: {
                    create: data.hobbies.map((hobby) => ({
                        name: hobby.name
                    })),
                },

            }
        });

    }
}

export default PeopleService