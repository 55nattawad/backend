'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './styles.css'; // ไฟล์ CSS ของคุณเอง

export default function Page() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function getUsers() {
      try {
        const res = await fetch('http://localhost:3000/api/users');
        if (!res.ok) {
          console.error('Failed to fetch data');
          return;
        }
        const data = await res.json();
        setItems(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    getUsers();
    const interval = setInterval(getUsers, 10000); // Update every 10 seconds
    return () => clearInterval(interval);
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        const res = await fetch(`https://backend-eight-self.vercel.app/api/users/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id }),
        });

        if (!res.ok) {
          const result = await res.json();
          console.error(result.error || 'Failed to delete user');
          return;
        }
        
        // Remove the deleted item from the state
        setItems(items.filter(item => item.id !== id));
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100 bg-light-purple">
      {/* Header */}
      <header className="bg-purple-dark text-white text-center py-3">
        <h1 className="mb-0">My Website <i className="bi bi-house-door"></i></h1>
      </header>

      {/* Main Content */}
      <main className="container mt-5 flex-grow-1" style={{ maxWidth: '1200px' }}>
        <div className="card" style={{ borderRadius: '15px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
          <div className="card-header bg-purple-dark text-white text-center" style={{ borderBottom: 'none', borderRadius: '15px 15px 0 0' }}>
            <h3 className="mb-0">Users List <i className="bi bi-person-lines-fill"></i></h3>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-striped table-hover">
                <thead>
                  <tr>
                    <th className='col-md-2 text-center'>#</th>
                    <th className='col-md-4'>Firstname</th>
                    <th className='col-md-4'>Lastname</th>
                    <th className='col-md-1 text-center'>Edit</th>
                    <th className='col-md-1 text-center'>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {items.length > 0 ? (
                    items.map((item) => (
                      <tr key={item.id}>
                        <td className='text-center'>{item.id}</td>
                        <td>{item.firstname}</td>
                        <td>{item.lastname}</td>
                        <td className='text-center'>
                          <Link href={`/edit/${item.id}`} className="btn btn-warning btn-sm">
                            <i className="bi bi-pencil"></i> Edit
                          </Link>
                        </td>
                        <td className='text-center'>
                          <button 
                            onClick={() => handleDelete(item.id)} 
                            className="btn btn-danger btn-sm"
                          >
                            <i className="bi bi-trash"></i> Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center">No users available</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-purple-dark text-white text-center py-3">
        <p className="mb-0">© Nuttawad | HaHaHa <i className="bi bi-copyright"></i></p>
      </footer>
    </div>
  );
}
