import { BrowserRouter } from "react-router-dom"
import { ThemeProvider } from "./context/theme-provider"

const App = () => {
  return (
    <BrowserRouter>
      <ThemeProvider defaultTheme="dark">
        <div>Hello</div>
    </ThemeProvider>
    </BrowserRouter>
  )
}

export default App