import React from 'react'

const Header = () => {
  return (
    <div>
        <header class="bg-dark text-white py-4">
            <div class="container">
                <div class="row align-items-center">
                    <div class="col-md-6">
                        <h1>Emcure Pharmaceticals</h1>
                        <p>Pharmacy Management System</p>
                    </div>
                    <div class="col-md-6 text-md-end">
                        <a href="#" class="btn btn-primary btn-lg">Search</a>
                    </div>
                </div>
            </div>
        </header>
    </div>
  )
}

export default Header