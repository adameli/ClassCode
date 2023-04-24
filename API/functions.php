<?php 
function generateUserEndpoint() {
    $webContent = '
    <!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                
                <link rel="stylesheet" href="../../CSS/index.css">
                <link rel="stylesheet" href="../../RESOURCES/github-dark-dimmed.min.css">
                
                <title>ClassCode</title>
            </head>
            <body>
                <img src="../../RESOURCES/backgroundImageBlur.jpg" alt="Hand on a electrical lamp" class="backgroundImage">
                <header>
                    <div>
                        <div class="logo"><svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="M3 12H15M3 6H21M3 18H21" stroke="#f5f5f5" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round" id="id_218"></path>
                            </svg></div>
                        <nav>
                            <!-- fill on click? -->
                        </nav>
                    </div>
                            
                    <div class="userInformation">
                    </div>

                </header>

                <main>
                </main>

                <footer></footer>

                <script src="../../RESOURCES/highlight.min.js"></script>
                <script src="../../JS/functions.js"></script>
                <script src="../../JS/navigation.js"></script>
                <script src="../../JS/accountPage.js"></script>
                <script src="../../JS/index.js"></script>
            </body>
        </html';

    return $webContent;
}

function generateThreadEndpoint() {
    $webContent = '<!DOCTYPE html>
                    <html lang="en">
                        <head>
                            <meta charset="UTF-8">
                            <meta http-equiv="X-UA-Compatible" content="IE=edge">
                            <meta name="viewport" content="width=device-width, initial-scale=1.0">
                            
                            <link rel="stylesheet" href="../../CSS/index.css">
                            <link rel="stylesheet" href="../../RESOURCES/github-dark-dimmed.min.css">
                            
                            <title>ClassCode</title>
                        </head>
                        <body>
                            <img src="../../RESOURCES/backgroundImageBlur.jpg" alt="Hand on a electrical lamp" class="backgroundImage">
                            <header>
                                <div>
                                    <div class="logo"><svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path d="M3 12H15M3 6H21M3 18H21" stroke="#f5f5f5" stroke-width="2" stroke-linecap="round"
                                                stroke-linejoin="round" id="id_218"></path>
                                        </svg></div>
                                    <nav>
                                        <!-- fill on click? -->
                                    </nav>
                                </div>
                                
                                <div class="userInformation">
                                </div>

                            </header>

                            <main>
                            </main>

                            <footer></footer>

                            <script src="../../RESOURCES/highlight.min.js"></script>
                            <script src="../../JS/functions.js"></script>
                            <script src="../../JS/navigation.js"></script>
                            <script src="../../JS/threadPage.js"></script>
                            <script src="../../JS/index.js"></script>
                        </body>
                    </html';
    return $webContent;
}

?>