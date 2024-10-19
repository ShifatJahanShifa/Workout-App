import { Link } from 'react-router-dom'
import WorkoutForm from '../pages/WorkoutForm'

const Navbar = () =>{
    return(
        <nav className='bg-slate-400'>
            <div className='h-10 p-3 mt-0 flex items-center justify-between'>
                <Link to='/' className='flex-1 flex items-center gap-2 text-black'>
                    <i class="fa-solid fa-person-walking"></i>  
                    <h1 className='text-lg font-medium'>Workout Buddy</h1>
                </Link>
                <div className='flex-1 flex gap-5 mr-10'>
                    <Link to='/' className='flex'>
                        <h1 className='hover:text-white'>Home</h1>
                    </Link>
                    <Link to='/post' className='flex'>
                        <h2 className='hover:text-white'>Post</h2>
                    </Link>
                </div>
            </div>
        </nav>
    )
}

export default Navbar