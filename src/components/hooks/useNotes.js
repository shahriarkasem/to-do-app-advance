import { useQuery } from "react-query";

const useNotes = (user) => {
    const email = user?.email;
    const {data: notes, refetch, isLoading} = useQuery('notesData', () => fetch(`https://morning-brook-82876.herokuapp.com/notes/ongoing?email=${email}`).then(res=>res.json()
    )
    )
    return {notes, refetch, isLoading};
}

export default useNotes;