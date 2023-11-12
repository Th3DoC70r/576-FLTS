import { db } from 'src/lib/db'

export const requirements = () => {
  return db.requirement.findMany()
}

export const requirement = ({ id }) => {
  return db.requirement.findUnique({
    where: { id },
  })
}

export const createRequirement = ({ input }) => {
  return db.requirement.create({
    data: input,
  })
}

export const updateRequirement = ({ id, input }) => {
  return db.requirement.update({
    data: input,
    where: { id },
  })
}

export const deleteRequirement = ({ id }) => {
  return db.requirement.delete({
    where: { id },
  })
}
