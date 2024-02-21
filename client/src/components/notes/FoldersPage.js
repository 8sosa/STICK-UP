import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Container, Row, Col } from 'react-bootstrap'
import { GiEvilBook } from 'react-icons/gi';
import { useNavigate } from 'react-router-dom'


export default function FoldersPage(){
    const [directories, setDirectories] = useState([]);
    const navigate = useNavigate()

    const getDirectories = async (token) =>{
        const res = await axios.get('/directory', {
            headers:{Authorization: token}
        })
        setDirectories(res.data)
    }

    useEffect(() =>{
        const token = localStorage.getItem('tokenStore')
        if(token){
            getDirectories(token)
        }
    }, [directories])
    

    return (
        <>
            <Container fluid className='Page'>
                <div className='pagediv'>
                <h2 className='createNote d-flex justify-content-center align-items-center pt-3'>FOLDERS</h2>
                <Row> 
                    {
                        directories.map(directory =>(
                            <Col key={directory._id} className='mb-5 mt-5 d-flex justify-content-center align-items-center'>
                                <div className='folder' onClick={()=> navigate(`/dirnotes/${directory._id}`)}>                                    
                                    <GiEvilBook size={100}/>
                                    <p>{directory.name}</p>
                                </div>
                            </Col>
                        ))
                    }
                </Row>
                </div>
            </Container>
        </>
    )
}