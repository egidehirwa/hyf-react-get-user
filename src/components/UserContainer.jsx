import './UserContainer.css';
import Loading from './Loading';
import User from './User';
import { useState, useEffect } from 'react';
import getUser from '../apis/getUser';


const UserContainer = () => {
    const [user, setUser] = useState(null);
    const [id, setId] = useState(1);
    const[loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            setLoading(true);
            setError(false);
            try {
                const userData = await getUser(id);
                setUser(userData);
            } catch (err) {
                setError(true);
            } finally {
                setLoading(false);
            }
        }
        fetchUser();
    }, [id]);

    const clickHandler = (change) => {
        if(change === 'previous') {
            setId((prevId) => prevId - 1);
        } else {
            setId((prevId) => prevId + 1);
        }
    }

  return (
        <div>
            {loading && <Loading/>}
            {error && <div>Error</div>}
            {user && !loading && !error && <User user={user}/>}

            <button onClick={() => clickHandler('previous')}>Previous</button>
            <button onClick={() => clickHandler('next')}>Next</button>
        </div>
  )
}

export default UserContainer;