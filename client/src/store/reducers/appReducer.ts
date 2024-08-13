import { createSlice } from '@reduxjs/toolkit'

interface AppState {
  isShowMobileMenu: boolean
}

const initialState: AppState = {
  isShowMobileMenu: false
}

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    toggleMobileMenu: (state) => {
      state.isShowMobileMenu = !state.isShowMobileMenu
    },
    handleCloseMobileMenu: (state) => {
      state.isShowMobileMenu = false
    }
  }
})

const { actions, reducer: appReducer } = appSlice

export const { toggleMobileMenu, handleCloseMobileMenu } = actions

export default appReducer
