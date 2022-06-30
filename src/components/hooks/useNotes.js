import { useQuery } from "react-query";

const useNotes = (user) => {
    const email = user?.email;
    const {data: notes, refetch, isLoading} = useQuery('notesData', () => fetch(`https://intense-depths-38593.herokuapp.com/notes?email=${email}`).then(res=>res.json()
    )
    )
    return {notes, refetch, isLoading};
}

export default useNotes;