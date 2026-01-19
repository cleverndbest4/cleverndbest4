}# Project Overview

This repository hosts a production-grade software project with automated testing, CI/CD enforcement, and controlled release management using GitHub Actions.

The project is designed for reliability, transparency, and scalable development workflows.

---

## Purpose

- Enforce code quality through continuous integration  
- Prevent unintended releases through gated workflows  
- Track all work transparently using Issues and Projects  
- Standardize development and review processes  

---

## Workflow Summary

- Issues define all work  
- Pull Requests implement changes  
- CI validates every change  
- Releases are manual and approval-gated  

---
  const textBody = await resp.text();
  if (!resp.ok) {
    // Try to include the response body for debugging
    throw new Error(`OpenAI API error ${resp.status}: ${textBody}`);
  }

  let data;
  try {
    data = JSON.parse(textBody);
  } catch (e) {
    throw new Error(`OpenAI returned invalid JSON: ${e.message}`);
  }

  const choice = data.choices && data.choices[0];
  if (!choice) {
    throw new Error('OpenAI returned no choices in response');
  }

  const content = choice.message?.content ?? (choice.text || '');
  return { raw: data, text: content };
} catch (err) {
  const isLast = attempt > retries;
  // Determine if transient: network errors, 429, 5xx
  const transient = /ECONNRESET|ETIMEDOUT|EAI_AGAIN/.test(err.message) || /OpenAI API error 429|5\d\d/.test(err.message);
  if (transient && !isLast) {
    const backoffMs = 500 * Math.pow(2, attempt - 1);
    console.warn(`OpenAI request failed (attempt ${attempt}) - retrying in ${backoffMs}ms: ${err.message}`);
    await sleep(backoffMs);
    continue;
  }
  // Final failure
  const msg = `OpenAI request failed after ${attempt} attempt(s): ${err.message}`;
  const e = new Error(msg);
  e.cause = err;
  throw e;
}
