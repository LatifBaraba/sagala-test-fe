import { create } from 'zustand'
import DevelopmentData from '../constants/development.json'

export const useStoreDevelopment = create(set => ({
    developmentData: DevelopmentData,
    addDevelopment: payload => set(state => ({ developmentData: [...state.developmentData, payload] })),
    deleteDevelopment: payload => set(state => ({ developmentData: state.developmentData.filter(item => item.id != payload)})),
}))
