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
        
        fetch(apiUrl)
            .then(response => response.json())
            .then(repos => {
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
                    
                    return `
                        <div class="col-md-6 col-lg-4" style="margin-bottom: 20px;">
                            <div class="project shadow-large" style="height: 100%; display: flex; flex-direction: column;">
                                <div class="project-info" style="padding: 15px; flex-grow: 1; display: flex; flex-direction: column;">
                                    <div style="margin-bottom: 10px;">
                                        <span class="badge" style="background: ${categoryColors[category]}; color: white; padding: 4px 8px; border-radius: 3px; font-size: 11px;">
                                            <i class="fa ${categoryIcons[category]}"></i> ${categoryLabels[category]}
                                        </span>
                                    </div>
                                    <h3 style="font-size: 17px; margin-bottom: 10px; font-weight: 500;">
                                        <i class="fa fa-github"></i> ${repo.name}
                                    </h3>
                                    <p style="font-size: 13px; min-height: 60px; color: #74808a; flex-grow: 1;">
                                        ${repo.description || 'No description available'}
                                    </p>
                                    <div style="margin-top: 10px;">
                                        ${repo.language ? `<span class="badge" style="background: #2ecc71; color: white; padding: 3px 8px; border-radius: 3px; margin-right: 5px; font-size: 11px;">${repo.language}</span>` : ''}
                                        <span style="font-size: 12px; color: #999;">
                                            <i class="fa fa-star" style="color: #f39c12;"></i> ${repo.stargazers_count} 
                                            <i class="fa fa-code-fork" style="margin-left: 10px;"></i> ${repo.forks_count}
                                        </span>
                                    </div>
                                    <div style="margin-top: 15px; display: flex; gap: 10px; flex-wrap: wrap;">
                                        ${hasDetailPage ? `
                                        <a href="${detailPageUrl}" style="display: inline-block; padding: 8px 15px; background: ${categoryColors[category]}; color: white; text-decoration: none; border-radius: 4px; font-size: 13px; transition: background 0.3s;">
                                            <i class="fa fa-info-circle"></i> View Details
                                        </a>
                                        ` : ''}
                                        <a href="${repo.html_url}" target="_blank" style="display: inline-block; padding: 8px 15px; background: #374054; color: white; text-decoration: none; border-radius: 4px; font-size: 13px; transition: background 0.3s;">
                                            <i class="fa fa-github"></i> GitHub <i class="fa fa-external-link"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
                }
                
                // Afficher les repos par catégorie
                if (categorizedRepos.cybersecurity.length > 0) {
                    githubProjectsContainer.append('<div class="col-12" style="margin-top: 20px; margin-bottom: 15px;"><h4 style="color: #e74c3c; border-bottom: 2px solid #e74c3c; padding-bottom: 5px;"><i class="fa fa-shield"></i> Cybersecurity Projects</h4></div>');
                    categorizedRepos.cybersecurity.forEach(repo => {
                        githubProjectsContainer.append(createProjectCard(repo, 'cybersecurity'));
                    });
                }
                
                if (categorizedRepos.devjam.length > 0) {
                    githubProjectsContainer.append('<div class="col-12" style="margin-top: 20px; margin-bottom: 15px;"><h4 style="color: #9b59b6; border-bottom: 2px solid #9b59b6; padding-bottom: 5px;"><i class="fa fa-gamepad"></i> DEV JAM Projects</h4></div>');
                    categorizedRepos.devjam.forEach(repo => {
                        githubProjectsContainer.append(createProjectCard(repo, 'devjam'));
                    });
                }
                
                if (categorizedRepos.development.length > 0) {
                    githubProjectsContainer.append('<div class="col-12" style="margin-top: 20px; margin-bottom: 15px;"><h4 style="color: #3498db; border-bottom: 2px solid #3498db; padding-bottom: 5px;"><i class="fa fa-code"></i> Development Projects</h4></div>');
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
