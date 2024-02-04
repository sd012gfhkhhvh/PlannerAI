/* eslint-disable no-unused-vars */
import { Route, Routes } from "react-router-dom";
import { RecoilRoot } from 'recoil'
import { Home } from "./pages/Home";
import Travel from "./pages/travel";
import { Test } from "./components/Test";
const App = () => {
  return (
    <>
      <RecoilRoot>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/travel" element={<Travel />}></Route>
          <Route path="/test" element={<Test />}></Route>
        </Routes>
      </RecoilRoot>
    </>
  )
}

export default App;
