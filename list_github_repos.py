import requests
import json

# Récupérer tous les repos de HAMZAZEROUAL2001
response = requests.get('https://api.github.com/users/HAMZAZEROUAL2001/repos?per_page=100&sort=updated')
repos = response.json()

print(f"Total repos trouvés: {len(repos)}\n")
print("="*80)

# Séparer les repos normaux et les dev jam repos
dev_jam_repos = []
normal_repos = []

for repo in repos:
    if 'dev' in repo['name'].lower() and 'jam' in repo['name'].lower():
        dev_jam_repos.append(repo)
    else:
        normal_repos.append(repo)

# Afficher tous les repos
print("\n📦 TOUS LES REPOS:")
print("="*80)
for i, repo in enumerate(repos, 1):
    print(f"\n{i}. {repo['name']}")
    print(f"   📝 Description: {repo['description'] or 'No description'}")
    print(f"   💻 Language: {repo['language'] or 'N/A'}")
    print(f"   ⭐ Stars: {repo['stargazers_count']} | 🔀 Forks: {repo['forks_count']}")
    print(f"   🔗 URL: {repo['html_url']}")
    if repo['fork']:
        print(f"   🍴 (Forked from another repo)")

# Afficher les dev jam repos
print("\n\n🎮 DEV JAM REPOS:")
print("="*80)
if dev_jam_repos:
    for i, repo in enumerate(dev_jam_repos, 1):
        print(f"\n{i}. {repo['name']}")
        print(f"   📝 Description: {repo['description'] or 'No description'}")
        print(f"   💻 Language: {repo['language'] or 'N/A'}")
        print(f"   ⭐ Stars: {repo['stargazers_count']} | 🔀 Forks: {repo['forks_count']}")
        print(f"   🔗 URL: {repo['html_url']}")
else:
    print("Aucun repo 'dev jam' trouvé avec ce pattern exact.")
    print("\nRecherche de repos contenant 'dev' OU 'jam' dans le nom:")
    for repo in repos:
        if 'dev' in repo['name'].lower() or 'jam' in repo['name'].lower():
            print(f"  - {repo['name']}: {repo['html_url']}")

print(f"\n\n📊 RÉSUMÉ:")
print("="*80)
print(f"Total repos: {len(repos)}")
print(f"Dev Jam repos: {len(dev_jam_repos)}")
print(f"Repos normaux: {len(normal_repos)}")
print(f"Forks: {sum(1 for r in repos if r['fork'])}")
print(f"Repos originaux: {sum(1 for r in repos if not r['fork'])}")
