import pytest
from playwright.sync_api import Page


@pytest.fixture
def site(page: Page):
    """Open the portfolio and fail the test if the page logs any error."""
    errors = []
    page.on("console", lambda msg: errors.append(msg.text) if msg.type == "error" else None)
    page.on("pageerror", lambda err: errors.append(str(err)))

    page.goto("/")
    yield page

    assert errors == [], f"Console errors on the page: {errors}"
