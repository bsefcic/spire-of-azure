# One-command GitHub Pages deployment for Spire of Azure
$ErrorActionPreference = "Stop"

Write-Host "Checking GitHub CLI authentication..." -ForegroundColor Cyan
gh auth status
if ($LASTEXITCODE -ne 0) {
  Write-Host "Logging in to GitHub via browser..." -ForegroundColor Yellow
  gh auth login --web -h github.com -p https
}

$ghUser = (gh api user --jq .login).Trim()
$repoName = "spire-of-azure"

Write-Host "Creating/pushing repository $ghUser/$repoName..." -ForegroundColor Cyan
gh repo view "$ghUser/$repoName" *> $null
if ($LASTEXITCODE -ne 0) {
  gh repo create "$repoName" --public --source=. --remote=origin --push
} else {
  git push -u origin main
}

Write-Host "Enabling GitHub Pages via GitHub Actions workflow..." -ForegroundColor Cyan
gh api -X POST "repos/$ghUser/$repoName/pages" -f build_type=workflow *> $null
if ($LASTEXITCODE -ne 0) {
  gh api -X PUT "repos/$ghUser/$repoName/pages" -f build_type=workflow *> $null
}

gh workflow run "Deploy Spire of Azure PWA to GitHub Pages" *> $null

Write-Host ""
Write-Host "==========================================================" -ForegroundColor Green
Write-Host " Spire of Azure is deploying to GitHub Pages!" -ForegroundColor Green
Write-Host " Open on your Galaxy S26+ in ~60 seconds:" -ForegroundColor Green
Write-Host " https://$ghUser.github.io/$repoName/" -ForegroundColor Cyan
Write-Host " Tap Chrome/Samsung Internet menu -> 'Install App' / 'Add to Home screen'" -ForegroundColor Yellow
Write-Host "==========================================================" -ForegroundColor Green
