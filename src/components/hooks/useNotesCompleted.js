import { useQuery } from "react-query";

const useCompletedNotes = (user) => {
    const email = user?.email;
    const {data: notes, refetch, isLoading} = useQuery('notesData', () => fetch(`http://localhost:5000/notes/complete?email=${email}`).then(res=>res.json()
    )
    )
    return {notes, refetch, isLoading};
}

export default useCompletedNotes;