import { createContext, useContext, useEffect, useState } from "react";
import useFetch from "../useFetch";


const LeadContext = createContext();

export const LeadProvider = ({children}) => {
    const {data, loading, error} = useFetch("https://anvaya-backend-7zaqzfvdx-tek-rajs-projects.vercel.app/leads")
    const {data:salesAgent} = useFetch("https://anvaya-backend-7zaqzfvdx-tek-rajs-projects.vercel.app/agents")
    const {data:dataLastWeek} = useFetch("https://anvaya-backend-7zaqzfvdx-tek-rajs-projects.vercel.app/report/last-week")
    const [lastWeek, setLastWeek] = useState("")
    const [agents, setAgents] = useState("")
    const [leads, setLeads] = useState("");
    const [filter, setFilter] = useState("");

    useEffect(() => {
        setLeads(data)
        setAgents(salesAgent)
        setLastWeek(dataLastWeek)
    }, [data])

    const filteredLeads = filter ? leads?.leads?.filter(lead => lead.status === filter ) : leads?.leads

    return (
        <LeadContext.Provider value={{ lastWeek, agents, leads, loading, error, filteredLeads, setFilter}} >
            {children}
        </LeadContext.Provider>
    )
}

export const useLead = () => useContext(LeadContext)