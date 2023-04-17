# demo

```
cls 
Write-host "Computer Name : $env:COMPUTERNAME" 
Write-host "Username : $env:USERNAME" 
Write-host "`nWindows Hotfix" 
get-hotfix | Where-Object {$_.Description -eq 'Security Update'} | Sort-Object -Property InstalledOn -Descending 
Start-Process "C:\Program Files (x86)\Trend Micro\Security Agent\PccNt.exe"
```
