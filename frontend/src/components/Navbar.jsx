import { Link } from 'react-router-dom'

const Navbar = () =>{
    return(
        <header className='bg-slate-400'>
            <div className='h-10 p-3 mt-0 flex items-center justify-between'>
                <Link to='/'>
                    <h1>Workout Buddy</h1>
                </Link>
            </div>
        </header>
    )
}

export default Navbar