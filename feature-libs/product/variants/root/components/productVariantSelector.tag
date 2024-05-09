<%@ tag body-content="empty" trimDirectiveWhitespaces="true" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="format" tagdir="/WEB-INF/tags/shared/format" %>
<%@ taglib prefix="product" tagdir="/WEB-INF/tags/responsive/product" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>

<%@ attribute name="product" required="true" type="de.hybris.platform.commercefacades.product.data.ProductData" %>

<c:set var="showAddToCart" value="" scope="session"/>
<spring:htmlEscape defaultHtmlEscape="true" />

<c:choose>
    <%-- Verify if products is a multidimensional product --%>
    <c:when test="${product.multidimensional and not empty product.variantMatrix}">
        <c:set var="levels" value="${fn:length(product.categories)}"/>
        <c:set var="selectedIndex" value="0"/>

        <div class="variant-section">
            <div class="variant-selector">
                <c:forEach begin="1" end="${levels}" varStatus="loop">
                    <c:set var="i" value="0"/>
                    <div class=" clearfix">
                        <c:choose>
                            <c:when test="${loop.index eq 1}">
                                <c:set var="productMatrix" value="${product.variantMatrix }"/>
                            </c:when>
                            <c:otherwise>
                                <c:set var="productMatrix" value="${productMatrix[selectedIndex].elements }"/>
                            </c:otherwise>
                        </c:choose>
                        <div class="variant-name">${fn:escapeXml(productMatrix[0].parentVariantCategory.name)}</div>
                        <c:choose>
                            <c:when test="${productMatrix[0].parentVariantCategory.hasImage}">
                                <ul class="variant-list">
                                    <c:forEach items="${productMatrix}" var="variantCategory">
                                        <li <c:if test="${variantCategory.variantOption.url eq product.url}">class="selected"</c:if>>
                                            <c:url value="${variantCategory.variantOption.url}" var="productStyleUrl"/>
                                            <a href="${fn:escapeXml(productStyleUrl)}" class="swatchVariant"
                                               name="${fn:escapeXml(productStyleUrl)}">
                                                <product:productImage product="${product}"
                                                                      code="${variantCategory.variantOption.code}"
                                                                      format="styleSwatch"/>
                                            </a>
                                        </li>
                                        <c:if test="${(variantCategory.variantOption.code eq product.code)}">
                                            <c:set var="selectedIndex" value="${i}"/>
                                        </c:if>
                                        <c:set var="i" value="${i + 1}"/>
                                    </c:forEach>
                                </ul>
                            </c:when>
                            <c:otherwise>
                                <select id="priority${loop.index}" class="selectPriority form-control">
                                    <c:forEach items="${productMatrix}" var="variantCategory">
                                        <c:url value="${variantCategory.variantOption.url}" var="productStyleUrl"/>
                                        <option value="${fn:escapeXml(productStyleUrl)}" ${(variantCategory.variantOption.code eq product.code) ? 'selected="selected"' : ''}>
                                                ${fn:escapeXml(variantCategory.variantValueCategory.name)}</option>
                                        <c:if test="${(variantCategory.variantOption.code eq product.code)}">
                                            <c:set var="selectedIndex" value="${i}"/>
                                        </c:if>
                                        <c:set var="i" value="${i + 1}"/>
                                    </c:forEach>
                                </select>
                            </c:otherwise>
                        </c:choose>
                    </div>
                </c:forEach>
            </div>
        </div>
    </c:when>
    <c:otherwise>
        <%-- Determine if product is one of apparel style or size variant --%>
        <c:if test="${product.variantType eq 'ApparelStyleVariantProduct'}">
            <c:set var="variantStyles" value="${product.variantOptions}"/>
        </c:if>
        <c:if test="${(not empty product.baseOptions[0].options) and (product.baseOptions[0].variantType eq 'ApparelStyleVariantProduct')}">
            <c:set var="variantStyles" value="${product.baseOptions[0].options}"/>
            <c:set var="variantSizes" value="${product.variantOptions}"/>
            <c:set var="currentStyleUrl" value="${product.url}"/>
        </c:if>
        <c:if test="${(not empty product.baseOptions[1].options) and (product.baseOptions[0].variantType eq 'ApparelSizeVariantProduct')}">
            <c:set var="variantStyles" value="${product.baseOptions[1].options}"/>
            <c:set var="variantSizes" value="${product.baseOptions[0].options}"/>
            <c:set var="currentStyleUrl" value="${product.baseOptions[1].selected.url}"/>
        </c:if>
        <c:url value="${currentStyleUrl}" var="currentStyledProductUrl"/>
        <%-- Determine if product is other variant --%>
        <c:if test="${empty variantStyles}">
            <c:if test="${not empty product.variantOptions}">
                <c:set var="variantOptions" value="${product.variantOptions}"/>
            </c:if>
            <c:if test="${not empty product.baseOptions[0].options}">
                <c:set var="variantOptions" value="${product.baseOptions[0].options}"/>
            </c:if>
        </c:if>

        <c:if test="${not empty variantStyles or not empty variantSizes}">
            <c:choose>
                <c:when test="${product.purchasable and product.stock.stockLevelStatus.code ne 'outOfStock' }">
                    <c:set var="showAddToCart" value="${true}" scope="session"/>
                </c:when>
                <c:otherwise>
                    <c:set var="showAddToCart" value="${false}" scope="session"/>
                </c:otherwise>
            </c:choose>
            <div class="variant-section">
                <c:if test="${not empty variantStyles}">
                    <div class="variant-selector">
                        <div class="variant-name">
                            <spring:theme code="product.variants.colour"/><span
                                class="variant-selected styleName"></span>
                        </div>
                        <ul class="variant-list">
                            <c:forEach items="${variantStyles}" var="variantStyle">
                                <c:forEach items="${variantStyle.variantOptionQualifiers}" var="variantOptionQualifier">
                                    <c:if test="${variantOptionQualifier.qualifier eq 'style'}">
                                        <c:set var="styleValueHtml" value="${fn:escapeXml(variantOptionQualifier.value)}"/>
                                        <c:set var="imageData" value="${variantOptionQualifier.image}"/>
                                    </c:if>
                                </c:forEach>
                                <li <c:if test="${variantStyle.url eq currentStyleUrl}"> class="active"</c:if>>
                                    <c:if test="${variantStyle.url eq currentStyleUrl}">
                                        <div id="currentStyleValue" data-style-value="${styleValueHtml}"></div>
                                    </c:if>
                                    <c:url value="${variantStyle.url}" var="productStyleUrl"/>
                                    <a href="${fn:escapeXml(productStyleUrl)}" class="colorVariant" name="${fn:escapeXml(variantStyle.url)}">
                                        <c:if test="${not empty imageData}">
                                            <img src="${fn:escapeXml(imageData.url)}" title="${styleValueHtml}" alt="${styleValueHtml}"/>
                                        </c:if>
                                        <c:if test="${empty imageData}">
                                            <span class="swatch_colour_a" title="${styleValueHtml}"></span>
                                        </c:if>
                                    </a>
                                </li>
                            </c:forEach>
                        </ul>
                    </div>
                </c:if>
                <c:if test="${not empty variantSizes}">
                    <div class="variant-selector">
                        <div class="variant-name">
                            <label for="Size"><spring:theme code="product.variants.size"/><span class="variant-selected sizeName"></span></label>
                        </div>
                        <select id="Size" class="form-control variant-select" disabled="disabled">
                            <c:if test="${empty variantSizes}">
                                <option selected="selected"><spring:theme code="product.variants.select.style"/></option>
                            </c:if>
                            <c:if test="${not empty variantSizes}">
                                <option value="${fn:escapeXml(currentStyledProductUrl)}"
                                        <c:if test="${empty variantParams['size']}">selected="selected"</c:if>>
                                    <spring:theme code="product.variants.select.size"/>
                                </option>
                                <c:forEach items="${variantSizes}" var="variantSize">
                                    <c:set var="optionsStringHtml" value=""/>
                                    <c:set var="nameStringHtml" value=""/>
                                    <c:forEach items="${variantSize.variantOptionQualifiers}" var="variantOptionQualifier">
                                        <c:if test="${variantOptionQualifier.qualifier eq 'size'}">
                                            <c:set var="variantOptionQualifierValueHtml" value="${fn:escapeXml(variantOptionQualifier.value)}"/>
                                            <c:set var="optionsStringHtml">${optionsStringHtml}&nbsp;${fn:escapeXml(variantOptionQualifier.name)}&nbsp;${variantOptionQualifierValueHtml}, </c:set>
                                            <c:set var="nameStringHtml">${variantOptionQualifierValueHtml}</c:set>
                                        </c:if>
                                    </c:forEach>

                                    <c:if test="${(variantSize.stock.stockLevel gt 0) and (variantSize.stock.stockLevelStatus ne 'outOfStock')}">
                                        <c:set var="stockLevelHtml">${fn:escapeXml(variantSize.stock.stockLevel)}&nbsp;
                                            <spring:theme code="product.variants.in.stock"/></c:set>
                                    </c:if>
                                    <c:if test="${(variantSize.stock.stockLevel le 0) and (variantSize.stock.stockLevelStatus eq 'inStock')}">
                                        <c:set var="stockLevelHtml"><spring:theme code="product.variants.available"/></c:set>
                                    </c:if>
                                    <c:if test="${(variantSize.stock.stockLevel le 0) and (variantSize.stock.stockLevelStatus ne 'inStock')}">
                                        <c:set var="stockLevelHtml"><spring:theme code="product.variants.out.of.stock"/></c:set>
                                    </c:if>

                                    <c:if test="${(variantSize.url eq product.url)}">
                                        <c:set var="showAddToCart" value="${true}" scope="session"/>
                                        <c:set var="currentSizeHtml" value="${nameStringHtml}"/>
                                    </c:if>

                                    <c:url value="${variantSize.url}" var="variantOptionUrl"/>

                                    <option value="${fn:escapeXml(variantOptionUrl)}" ${(variantSize.url eq product.url) ? 'selected="selected"' : ''}>
                                            ${optionsStringHtml}&nbsp;<format:price
                                            priceData="${variantSize.priceData}"/>&nbsp;&nbsp;${fn:escapeXml(variantSize.stock.stockLevel)}
                                    </option>
                                </c:forEach>
                            </c:if>
                        </select>
                        <div id="currentSizeValue" data-size-value="${currentSizeHtml}"></div>
                        <a href="#" class="size-guide" title="<spring:theme code="product.variants.size.guide"/>">&nbsp;</a>
                    </div>
                </c:if>
            </div>
        </c:if>
        <c:if test="${not empty variantOptions}">
            <div class="variant-section">
                <div class="variant-selector">
                    <div class="variant-name">
                        <label for="Type"><spring:theme code="product.variants.type"/><span
                                class="variant-selected typeName"></span></label>
                    </div>
                    <select id="variant" class="form-control variant-select" disabled="disabled">
                        <option selected="selected" disabled="disabled"><spring:theme
                                code="product.variants.select.variant"/></option>
                        <c:forEach items="${variantOptions}" var="variantOption">
                            <c:set var="optionsStringHtml" value=""/>
                            <c:set var="nameStringHtml" value=""/>
                            <c:forEach items="${variantOption.variantOptionQualifiers}" var="variantOptionQualifier">
                                <c:set var="optionsStringHtml">${optionsStringHtml}&nbsp;
                                    ${fn:escapeXml(variantOptionQualifier.name)}&nbsp;${fn:escapeXml(variantOptionQualifier.value)}, </c:set>
                                <c:set var="nameStringHtml">${fn:escapeXml(variantOptionQualifier.value)}</c:set>
                            </c:forEach>

                            <c:if test="${(variantOption.stock.stockLevel gt 0) and (variantSize.stock.stockLevelStatus ne 'outOfStock')}">
                                <c:set var="stockLevelHtml">${fn:escapeXml(variantOption.stock.stockLevel)} <spring:theme code="product.variants.in.stock"/></c:set>
                            </c:if>
                            <c:if test="${(variantOption.stock.stockLevel le 0) and (variantSize.stock.stockLevelStatus eq 'inStock')}">
                                <c:set var="stockLevelHtml"><spring:theme code="product.variants.available"/></c:set>
                            </c:if>
                            <c:if test="${(variantOption.stock.stockLevel le 0) and (variantSize.stock.stockLevelStatus ne 'inStock')}">
                                <c:set var="stockLevelHtml"><spring:theme code="product.variants.out.of.stock"/></c:set>
                            </c:if>
                            <c:choose>
                                <c:when test="${product.purchasable and product.stock.stockLevelStatus.code ne 'outOfStock' }">
                                    <c:set var="showAddToCart" value="${true}" scope="session"/>
                                </c:when>
                                <c:otherwise>
                                    <c:set var="showAddToCart" value="${false}" scope="session"/>
                                </c:otherwise>
                            </c:choose>
                            <c:url value="${variantOption.url}" var="variantOptionUrl"/>
                            <c:if test="${(variantOption.url eq product.url)}">
                                <c:set var="showAddToCart" value="${true}" scope="session"/>
                                <c:set var="currentSizeHtml" value="${nameStringHtml}"/>
                            </c:if>
                            <option value="${fn:escapeXml(variantOptionUrl)}" ${(variantOption.url eq product.url) ? 'selected="selected"' : ''}>
                                <span class="variant-selected">${optionsStringHtml}&nbsp;<format:price
                                        priceData="${variantOption.priceData}"/>&nbsp;&nbsp;${fn:escapeXml(variantOption.stock.stockLevel)}</span>
                            </option>
                        </c:forEach>
                    </select>
                    <div id="currentTypeValue" data-type-value="${currentSizeHtml}"></div>
                </div>
            </div>
        </c:if>
    </c:otherwise>
</c:choose>
