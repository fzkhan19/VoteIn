"use client"

import {QueryClient, QueryClientProvider} from "@tanstack/react-query"
import {ReactNode} from "react"
import {ThemeProvider} from "./layout/theme-provider"

const client = new QueryClient()

const Providers = ({children}: {children: ReactNode}) => {
  return (<QueryClientProvider client={client}>
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  </QueryClientProvider>)
}

export default Providers
