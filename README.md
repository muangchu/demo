# demo

```
cls 
Write-host "Computer Name : $env:COMPUTERNAME" 
Write-host "Username : $env:USERNAME" 
Write-host "`nWindows Hotfix" 
get-hotfix | Where-Object {$_.Description -eq 'Security Update'} | Sort-Object -Property InstalledOn -Descending 
Start-Process "C:\Program Files (x86)\Trend Micro\Security Agent\PccNt.exe"
```


```
POST /transactions/_search
{
  "size": 0,
  "aggs": {
    "tps_per_second": {
      "date_histogram": {
        "field": "@timestamp",
        "fixed_interval": "1s"
      },
      "aggs": {
        "transactions_per_second": {
          "value_count": {
            "field": "transaction_id"
          }
        }
      }
    },
    "max_tps": {
      "max_bucket": {
        "buckets_path": "tps_per_second>transactions_per_second"
      }
    }
  }
}
```


https://chatgpt.com/share/6798a23f-00a4-8012-a4ac-d77bed14f2c9


fluent bit
https://chatgpt.com/share/679b03c7-078c-8012-b49e-f4d78737dd32

