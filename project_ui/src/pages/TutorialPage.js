import React from 'react';
import { Link } from 'react-router-dom';

/**
 * TutorialPage contains a list of tips for the user to understand the website
 * @returns UI for TutorialPage
 */
function TutorialPage () {
    return (
        <body>
            <header>
                <h1 class="page_header">RPG Character Manager</h1>
                <nav>
                    <ul>
                            <Link to="/">
                                <li>
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
                <h1>Tutorial</h1>
                    <ol>
                        <li>
                            Create World - Select a name for you world.
                        </li>
                        <li>
                            Create Character - Select a name for your character.
                        </li>
                        <li>
                            Create Item - Select an item name and how much money it is worth.  This item will only belong to your character.
                        </li>
                        <li>
                            Update Character - Update your character name, stats, or gold.
                        </li>
                        <li>
                            Merchant - Click sell to sell any of your items for its value.  The value will be added to your character's total gold.
                        </li>
                    </ol>

            </main>

            <footer>
                <Link to="/tutorial">Tutorial</Link>
            </footer>
        </body>
    )

}

export default TutorialPage;
