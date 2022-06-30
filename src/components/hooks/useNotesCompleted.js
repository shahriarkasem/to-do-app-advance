import { useQuery } from "react-query";

const useCompletedNotes = (user) => {
    const email = user?.email;
    const {data: notes, refetch, isLoading} = useQuery('notesData', () => fetch(`https://morning-brook-82876.herokuapp.com/notes/complete?email=${email}`).then(res=>res.json()
    )
    )
    return {notes, refetch, isLoading};
}

export default useCompletedNotes;