import React from 'react';
import { Link } from 'react-router-dom';

/**
 * HomePage is the landing page when the user first opens the program.
 * @returns UI for HomePage
 */
function HomePage (){
    return (
        <body>
            <header>
                <h1 class="page_header">RPG Character Manager</h1>
                <nav>
                    <ul>
                        <Link to="/">                        
                            <li class="active">
                                Home                        
                            </li>
                        </Link>


                        <Link to="/worlds">
                        <li>
                            Worlds
                        </li>
                        </Link>


                        <Link to="/create_world">
                            <li>
                                Create World
                            </li>
                        </Link>

                    </ul>
                </nav>
            </header>
            <main>
                <div class="homepage_container">
                    <div class='homepage_text'>
                        Welcome to RPG Character Manager.  Select Create World to begin creating a new world, or select View Worlds to see worlds in progress.
                    </div>
                    <div class="homepage_link_container">
                        <div class="homepage_link_single_container">
                            <Link class="homepage_link" to="/create_world">Create World</Link>
                        </div>
                        <div class="homepage_link_single_container">
                            <Link class="homepage_link" to="/worlds">View Worlds</Link>
                        </div>
                    </div>
                </div>
             </main>

            <footer>
                <Link to="/tutorial">Tutorial</Link>
            </footer>
        </body>
    )
}
 
export default HomePage;
