'use client';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './styles.css'; // ไฟล์ CSS ของคุณเอง

export default function SignUpPage() {
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [username, setUserName] = useState('');
  const [password, setPassWord] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(''); // Clear previous message

    const res = await fetch('https://backend-eight-self.vercel.app/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ firstname, lastname, username, password }),
    });

    if (res.ok) {
      setMessage('Sign Up Successful!');
      // Clear form fields
      setFirstName('');
      setLastName('');
      setUserName('');
      setPassWord('');
    } else {
      const result = await res.json();
      setMessage(result.error || 'Sign Up Failed');
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100 bg-light-purple">
      {/* Header */}
      <header className="bg-purple-dark text-white text-center py-3">
        <h1 className="mb-0">Sign Up <i className="bi bi-person-plus"></i></h1>
      </header>

      {/* Main Content */}
      <main className="container mt-5 flex-grow-1" style={{ maxWidth: '600px' }}>
        <div className="card" style={{ borderRadius: '15px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
          <div className="card-header bg-purple-dark text-white text-center" style={{ borderBottom: 'none', borderRadius: '15px 15px 0 0' }}>
            <h3 className="mb-0">Sign Up Form <i className="bi bi-person-plus"></i></h3>
          </div>
          <div className="card-body" style={{ padding: '2rem' }}>
            <form className="row g-3" onSubmit={handleSubmit}>
              <div className="col-md-6">
                <label htmlFor="firstname" className="form-label">First Name <i className="bi bi-person"></i></label>
                <div className="input-group">
                  <span className="input-group-text" style={{ backgroundColor: '#f8f9fa' }}>
                    <i className="bi bi-person"></i>
                  </span>
                  <input 
                    type="text" 
                    id="firstname" 
                    className="form-control" 
                    value={firstname} 
                    onChange={(e) => setFirstName(e.target.value)} 
                    required 
                    style={{ borderRadius: '0.375rem' }}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <label htmlFor="lastname" className="form-label">Last Name <i className="bi bi-person-fill"></i></label>
                <div className="input-group">
                  <span className="input-group-text" style={{ backgroundColor: '#f8f9fa' }}>
                    <i className="bi bi-person-fill"></i>
                  </span>
                  <input 
                    type="text" 
                    id="lastname" 
                    className="form-control" 
                    value={lastname} 
                    onChange={(e) => setLastName(e.target.value)} 
                    required 
                    style={{ borderRadius: '0.375rem' }}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <label htmlFor="username" className="form-label">Username <i className="bi bi-person-circle"></i></label>
                <div className="input-group">
                  <span className="input-group-text" style={{ backgroundColor: '#f8f9fa' }}>
                    <i className="bi bi-person-circle"></i>
                  </span>
                  <input 
                    type="text" 
                    id="username" 
                    className="form-control" 
                    value={username} 
                    onChange={(e) => setUserName(e.target.value)} 
                    required 
                    style={{ borderRadius: '0.375rem' }}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <label htmlFor="password" className="form-label">Password <i className="bi bi-lock"></i></label>
                <div className="input-group">
                  <span className="input-group-text" style={{ backgroundColor: '#f8f9fa' }}>
                    <i className="bi bi-lock"></i>
                  </span>
                  <input 
                    type="password" 
                    id="password" 
                    className="form-control" 
                    value={password} 
                    onChange={(e) => setPassWord(e.target.value)} 
                    required 
                    style={{ borderRadius: '0.375rem' }}
                  />
                </div>
              </div>
              <div className="col-12">
                <button 
                  type="submit" 
                  className="btn btn-signup" 
                  style={{ width: '100%', padding: '0.75rem', fontSize: '1.125rem', borderRadius: '0.375rem' }}
                >
                  <i className="bi bi-box-arrow-right"></i> Sign Up
                </button>
              </div>
            </form>
            {message && (
              <div className="mt-3 alert alert-info">
                {message}
              </div>
            )}
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
