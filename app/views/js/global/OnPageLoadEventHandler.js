document.addEventListener("DOMContentLoaded", onPageLoadEventHandler, false);

function onPageLoadEventHandler() {
    function resetUrl(){
        window.history.pushState("", "", '/');
    }
    
    EventHandlerRegister.registerHandlersForTable();
    
    if (window.location.pathname.indexOf("add") !== -1) {
        resetUrl();
    }
}