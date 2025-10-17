/*!
    Title: Dev Portfolio Template
    Version: 1.2.2
    Last Change: 03/25/2020
    Author: Ryan Fitzgerald
    Repo: https://github.com/RyanFitzgerald/devportfolio-template
    Issues: https://github.com/RyanFitzgerald/devportfolio-template/issues

    Description: This file contains all the scripts associated with the single-page
    portfolio website.
*/

(function($) {

    // Show current year
    $("#current-year").text(new Date().getFullYear());

    // Remove no-js class
    $('html').removeClass('no-js');

    // Animate to section when nav is clicked
    $('header a').click(function(e) {

        // Treat as normal link if no-scroll class
        if ($(this).hasClass('no-scroll')) return;

        e.preventDefault();
        var heading = $(this).attr('href');
        var scrollDistance = $(heading).offset().top;

        $('html, body').animate({
            scrollTop: scrollDistance + 'px'
        }, Math.abs(window.pageYOffset - $(heading).offset().top) / 1);

        // Hide the menu once clicked if mobile
        if ($('header').hasClass('active')) {
            $('header, body').removeClass('active');
        }
    });

    // Scroll to top
    $('#to-top').click(function() {
        $('html, body').animate({
            scrollTop: 0
        }, 500);
    });

    // Scroll to first element
    $('#lead-down span').click(function() {
        var scrollDistance = $('#lead').next().offset().top;
        $('html, body').animate({
            scrollTop: scrollDistance + 'px'
        }, 500);
    });

    // Create timeline
    $('#experience-timeline').each(function() {

        $this = $(this); // Store reference to this
        $userContent = $this.children('div'); // user content

        // Create each timeline block
        $userContent.each(function() {
            $(this).addClass('vtimeline-content').wrap('<div class="vtimeline-point"><div class="vtimeline-block"></div></div>');
        });

        // Add icons to each block
        $this.find('.vtimeline-point').each(function() {
            $(this).prepend('<div class="vtimeline-icon"><i class="fa fa-map-marker"></i></div>');
        });

        // Add dates to the timeline if exists
        $this.find('.vtimeline-content').each(function() {
            var date = $(this).data('date');
            if (date) { // Prepend if exists
                $(this).parent().prepend('<span class="vtimeline-date">'+date+'</span>');
            }
        });

    });

    // Open mobile menu
    $('#mobile-menu-open').click(function() {
        $('header, body').addClass('active');
    });

    // Close mobile menu
    $('#mobile-menu-close').click(function() {
        $('header, body').removeClass('active');
    });

    // Load additional projects
    $('#view-more-projects').click(function(e){
        e.preventDefault();
        $(this).fadeOut(300, function() {
            $('#more-projects').fadeIn(300);
        });
    });

    // Charger les projets GitHub automatiquement
    function loadGithubProjects() {
        const username = 'HAMZAZEROUAL2001';
        const apiUrl = `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`;
        
        // Charger les descriptions personnalisées
        fetch('js/project-descriptions.json')
            .then(response => response.json())
            .then(projectDescriptions => {
                return fetch(apiUrl)
                    .then(response => response.json())
                    .then(repos => ({ repos, projectDescriptions }));
            })
            .then(({ repos, projectDescriptions }) => {
                const githubProjectsContainer = $('#github-projects');
                githubProjectsContainer.empty();
                
                if (repos.length === 0) {
                    githubProjectsContainer.html('<p style="text-align: center; width: 100%;">Aucun projet trouvé.</p>');
                    return;
                }
                
                // Filtrer les repos (exclure forks et repos test)
                const filteredRepos = repos.filter(repo => 
                    !repo.fork && 
                    repo.name !== 'test' && 
                    repo.name !== 'Hamza-ZEROUAL' &&
                    repo.name !== 'HAMZAZEROUAL2001.github.io' // Le portfolio lui-même
                );
                
                // Catégoriser les repos
                const cybersecurityKeywords = ['defender', 'bypass', 'anti-vm', 'antidbg', 'ransomware', 'malware', 'windows-internals', 'system-programming'];
                const devJamKeywords = ['devjam', 'devjem'];
                
                const categorizedRepos = {
                    cybersecurity: [],
                    devjam: [],
                    development: []
                };
                
                filteredRepos.forEach(repo => {
                    const repoNameLower = repo.name.toLowerCase();
                    const repoDescLower = (repo.description || '').toLowerCase();
                    
                    if (devJamKeywords.some(keyword => repoNameLower.includes(keyword))) {
                        categorizedRepos.devjam.push(repo);
                    } else if (cybersecurityKeywords.some(keyword => repoNameLower.includes(keyword) || repoDescLower.includes(keyword))) {
                        categorizedRepos.cybersecurity.push(repo);
                    } else {
                        categorizedRepos.development.push(repo);
                    }
                });
                
                // Fonction pour créer une carte de projet
                function createProjectCard(repo, category) {
                    const categoryColors = {
                        cybersecurity: '#e74c3c',
                        devjam: '#9b59b6',
                        development: '#3498db'
                    };
                    
                    const categoryGradients = {
                        cybersecurity: 'linear-gradient(135deg, #e74c3c, #c0392b)',
                        devjam: 'linear-gradient(135deg, #9b59b6, #8e44ad)',
                        development: 'linear-gradient(135deg, #3498db, #2980b9)'
                    };
                    
                    const categoryIcons = {
                        cybersecurity: 'fa-shield',
                        devjam: 'fa-gamepad',
                        development: 'fa-code'
                    };
                    
                    const categoryLabels = {
                        cybersecurity: 'Cybersecurity',
                        devjam: 'DEV JAM',
                        development: 'Development'
                    };
                    
                    // Mapping des repos qui ont une page de détails
                    const projectPages = {
                        'WindowsDefenderBypasseTechnqueFirstBlog': 'windows-defender-bypass.html',
                        'anti-VM-technique': 'anti-vm-technique.html',
                        'Simple-Ransomware-Example': 'ransomware-example.html',
                        'DEVJAM_code_crackers': 'devjam-code-crackers.html',
                        'DEVJEM_code_crackers-': 'devjam-code-crackers.html',
                        'voting-dapp-platform': 'voting-dapp.html'
                    };
                    
                    const hasDetailPage = projectPages[repo.name] !== undefined;
                    const detailPageUrl = hasDetailPage ? `projects/${projectPages[repo.name]}` : null;
                    
                    // Utiliser la description personnalisée si disponible
                    const customDescription = projectDescriptions[repo.name];
                    const description = customDescription ? customDescription.description : (repo.description || 'No description available');
                    
                    return `
                        <div class="col-md-6 col-lg-4" style="margin-bottom: 30px;">
                            <div style="padding: 25px; background: #fff; border-radius: 10px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); height: 100%; display: flex; flex-direction: column; transition: transform 0.3s ease, box-shadow 0.3s ease;">
                                <div style="text-align: center; margin-bottom: 20px;">
                                    <div style="width: 80px; height: 80px; margin: 0 auto 15px; background: ${categoryGradients[category]}; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 8px rgba(0,0,0,0.2);">
                                        <i class="fa ${categoryIcons[category]}" style="font-size: 40px; color: white;"></i>
                                    </div>
                                    <span style="background: ${categoryGradients[category]}; color: white; padding: 6px 14px; border-radius: 20px; font-size: 11px; font-weight: bold; text-transform: uppercase; display: inline-block;">
                                        ${categoryLabels[category]}
                                    </span>
                                </div>
                                <h3 style="font-size: 18px; margin: 0 0 15px 0; font-weight: 600; color: #2c3e50; line-height: 1.4; text-align: center; min-height: 50px;">
                                    ${repo.name.replace(/-/g, ' ').replace(/_/g, ' ')}
                                </h3>
                                <div style="flex-grow: 1; padding: 15px 0; border-top: 2px solid #ecf0f1; border-bottom: 2px solid #ecf0f1;">
                                    <p style="font-size: 13px; color: #7f8c8d; line-height: 1.6; margin-bottom: 12px; min-height: 75px;">
                                        ${description}
                                    </p>
                                    <div style="text-align: center; margin-top: 12px;">
                                        ${repo.language ? `<span style="background: #27ae60; color: white; padding: 5px 12px; border-radius: 15px; margin-right: 8px; font-size: 11px; display: inline-block;"><i class="fa fa-circle" style="font-size: 8px;"></i> ${repo.language}</span>` : ''}
                                        <span style="font-size: 12px; color: #95a5a6; display: inline-block;">
                                            <i class="fa fa-star" style="color: #f39c12;"></i> ${repo.stargazers_count} 
                                            <i class="fa fa-code-fork" style="margin-left: 8px; color: #3498db;"></i> ${repo.forks_count}
                                        </span>
                                    </div>
                                </div>
                                <div style="text-align: center; margin-top: 20px; display: flex; gap: 10px; justify-content: center;">
                                    ${hasDetailPage ? `
                                    <a href="${detailPageUrl}" style="flex: 1; display: inline-block; padding: 12px 20px; background: ${categoryGradients[category]}; color: white; text-decoration: none; border-radius: 6px; font-size: 13px; font-weight: 600; transition: all 0.3s;">
                                        <i class="fa fa-info-circle"></i> Details
                                    </a>
                                    ` : ''}
                                    <a href="${repo.html_url}" target="_blank" style="flex: 1; display: inline-block; padding: 12px 20px; background: linear-gradient(135deg, #34495e, #2c3e50); color: white; text-decoration: none; border-radius: 6px; font-size: 13px; font-weight: 600; transition: all 0.3s;">
                                        <i class="fa fa-github"></i> GitHub
                                    </a>
                                </div>
                            </div>
                        </div>
                    `;
                }
                
                // Afficher les repos par catégorie
                if (categorizedRepos.cybersecurity.length > 0) {
                    githubProjectsContainer.append('<div class="col-12" style="margin: 40px 0 25px 0; clear: both;"><h3 style="color: #e74c3c; font-size: 26px; font-weight: 600; border-bottom: 3px solid #e74c3c; padding-bottom: 12px; display: inline-block;"><i class="fa fa-shield" style="margin-right: 10px;"></i> Cybersecurity Projects</h3></div>');
                    categorizedRepos.cybersecurity.forEach(repo => {
                        githubProjectsContainer.append(createProjectCard(repo, 'cybersecurity'));
                    });
                }
                
                if (categorizedRepos.devjam.length > 0) {
                    githubProjectsContainer.append('<div class="col-12" style="margin: 40px 0 25px 0; clear: both;"><h3 style="color: #9b59b6; font-size: 26px; font-weight: 600; border-bottom: 3px solid #9b59b6; padding-bottom: 12px; display: inline-block;"><i class="fa fa-gamepad" style="margin-right: 10px;"></i> DEV JAM Projects</h3></div>');
                    categorizedRepos.devjam.forEach(repo => {
                        githubProjectsContainer.append(createProjectCard(repo, 'devjam'));
                    });
                }
                
                if (categorizedRepos.development.length > 0) {
                    githubProjectsContainer.append('<div class="col-12" style="margin: 40px 0 25px 0; clear: both;"><h3 style="color: #3498db; font-size: 26px; font-weight: 600; border-bottom: 3px solid #3498db; padding-bottom: 12px; display: inline-block;"><i class="fa fa-code" style="margin-right: 10px;"></i> Development Projects</h3></div>');
                    categorizedRepos.development.forEach(repo => {
                        githubProjectsContainer.append(createProjectCard(repo, 'development'));
                    });
                }
                
                // Ajouter un compteur total
                const totalRepos = filteredRepos.length;
                $('#github-projects').prepend(`<div class="col-12" style="margin-bottom: 20px;"><p style="text-align: center; color: #74808a; font-size: 14px;"><i class="fa fa-github"></i> ${totalRepos} repositories found</p></div>`);
            })
            .catch(error => {
                console.error('Erreur lors du chargement des projets GitHub:', error);
                $('#github-projects').html('<p style="text-align: center; width: 100%; color: red;">Error loading GitHub projects. Please try again later.</p>');
            });
    }
    
    // Charger les projets au chargement de la page
    loadGithubProjects();

})(jQuery);
