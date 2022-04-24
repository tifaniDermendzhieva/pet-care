import page from './node_modules/page/page.mjs';

import {renderNavigation} from './views/navigation.js'
import { renderHome } from './views/home.js';
import {renderLogin} from './views/login.js';
import {renderSignup} from './views/signup.js';
import {logout} from './services/logout.js';

import {renderCatalogue} from './views/catalogue.js';
import {renderDetails} from './views/details.js';
import {renderEdit} from './views/edit.js';
import {renderCreate} from './views/create.js';
import { deleteIt } from './views/delete.js';

//////////////////
import { makeDonation } from './makeDonation.js';


// initiate navi as middleware //
page(renderNavigation);

// Router
page('/', renderHome);
page('/login', renderLogin );
page('/signup', renderSignup );
page('/logout', logout);
page('/catalogue', renderCatalogue );
page('/create', renderCreate);
page('/details/:id', renderDetails );
page('/edit/:id', renderEdit );
page('/delete/:id', deleteIt);

/////bonus///
page('/donate/:id', makeDonation);

page.start();