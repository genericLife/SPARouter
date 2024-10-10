import exampleView from "./views/exampleView.js";
import exampleView2 from "./views/exampleView2.js";

const pathToRegex = path => new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");

const getParams = match => {
    const values = match.result.slice(1);
    const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(result => result[1]);

    return Object.fromEntries(keys.map((key, i) => {
        return [key, values[i]];
    }));
};

export const navigateTo = url => {
    history.pushState(null, null, url);
    router();
};

const router = async () => {
    const routes = [
        { path: "/", view: exampleView },
        { path: "/example2", view: exampleView2 }
    ];

    // Test each route for potential match
    const potentialMatches = routes.map(route => {
        return {
            route: route,
            result: location.pathname.match(pathToRegex(route.path))
        };
    });

    let match = potentialMatches.find(potentialMatch => potentialMatch.result !== null);

    if (!match) {
        match = {
            route: routes[0],
            result: [location.pathname]
        };
    }

    const view = new match.route.view(getParams(match));
    
    const html = await view.getHtml();
    $("#app").html(html);

    await view.runHandlers(document);    
};

window.addEventListener("popstate", router);

window.addEventListener( "pageshow", function ( event ) {
    var historyTraversal = event.persisted ;
    if ( historyTraversal ) {
      // Handle page restore.
      window.location.reload();
    }
  });

document.addEventListener("DOMContentLoaded", () => {
    console.log('test');
    router();
});
